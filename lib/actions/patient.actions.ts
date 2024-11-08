"use server";

import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file"; 



export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    // console.log("New User Created:", newUser);

    return parseStringify(newUser);

  } catch (error: unknown) {
    // console.error("Error during user creation:", error);

    if (
      typeof error === "object" && 
      error !== null && 
      "code" in error && 
      (error as { code: number }).code === 409
    ) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      // console.log("User already exists:", existingUser.users[0]);

      return existingUser.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);

  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    // console.log("Fetching patient with userId:", userId);
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );
    // console.log("Appwrite response:", patients);

    return parseStringify(patients.documents[0]);

  } catch (error) {
    console.error("Error retrieving patient details:", error);
  }
};


export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    if(identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob,
          identificationDocument?.get('fileName') as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    )

    return parseStringify(newPatient);

  } catch (error) {
    console.log(error);
  }
};