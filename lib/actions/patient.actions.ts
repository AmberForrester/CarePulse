"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { randomBytes } from "crypto";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  const { users } = await createAdminClient(); // Use admin client

  try {
    const generatedPassword = randomBytes(16).toString("hex"); // Generate random password if needed
    const newUser = await users.create(
      ID.unique(),
      user.email,
      generatedPassword,
      user.name
    );
    console.log("New Auth User Created with ID:", newUser.$id);
    return parseStringify(newUser);
  } catch (error: unknown) {
    if (error) {
      const existingUser = await users.list([Query.equal("email", [user.email])]);
      console.log("Existing user found:", existingUser.users[0]);
      return existingUser.users[0];
    }
    console.error("Error during user creation:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  const { users } = await createAdminClient(); // Use admin client

  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Error retrieving user details:", error);
  }
};

// REGISTER PATIENT
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  const { databases, storage } = await createAdminClient(); // Use admin client

  try {
    let file;
    
    if(identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob,
          identificationDocument?.get('fileName') as string
      );
      file = await storage.createFile(appwriteConfig.bucket_Id, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.patientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucket_Id}/files/${file.$id}/view?project=${appwriteConfig.projectId}`
          : null,
        ...patient,
      }
    );

    console.log("New Patient Document Created:", newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error creating new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  const { databases } = await createAdminClient(); // Use admin client

  try {
    const patients = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.patientCollectionId,
      [Query.equal("userId", [userId])]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("Error retrieving patient details:", error);
  }
};