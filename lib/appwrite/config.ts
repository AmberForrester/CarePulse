// import * as sdk from "node-appwrite";

// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
// } = process.env;

// const client = new sdk.Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject(PROJECT_ID!)
//   .setKey(API_KEY!);

// export const databases = new sdk.Databases(client);
// export const storage = new sdk.Storage(client);
// export const messaging = new sdk.Messaging(client);
// export const users = new sdk.Users(client);




export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  patientCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID!,
  doctorCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION_ID!,
  appointmentCollectionId: process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!,
  bucket_Id: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  apiKey: process.env.NEXT_APPWRITE_API_KEY!,
};

export const ENDPOINT = appwriteConfig.endpointUrl;
export const PROJECT_ID = appwriteConfig.projectId;
export const DATABASE_ID = appwriteConfig.databaseId;
export const PATIENT_COLLECTION_ID = appwriteConfig.patientCollectionId;
export const DOCTOR_COLLECTION_ID = appwriteConfig.doctorCollectionId;
export const APPOINTMENT_COLLECTION_ID = appwriteConfig.appointmentCollectionId; 
export const BUCKET_ID = appwriteConfig.bucket_Id;