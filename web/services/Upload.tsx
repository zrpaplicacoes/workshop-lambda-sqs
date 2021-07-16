import axios from 'axios';

const baseURL = "http://localhost:3000"

const client = axios.create({ baseURL });
const s3 = axios.create();

export interface ProgressEvent {
  loaded: number;
  total: number;
}

export type ProgressCallback = (ev: ProgressEvent) => void;

/**
 * Get signed upload url
 * 
 * @returns 
 */
const getUploadUrl = async (): Promise<{ Key: string; uploadURL: string }> => {
  const response = await client.get("/upload");

  return response.data;
};

/**
 * Upload blob to server
 * 
 * @param blob 
 * @param progressCallback 
 * @returns 
 */
export const uploadImage = async (blob: Blob, progressCallback: ProgressCallback): Promise<boolean> => {
  const { uploadURL, Key } = await getUploadUrl();

  const response = await s3.put(uploadURL, blob, {
    onUploadProgress: (event) => {
      if (!!progressCallback) {
        progressCallback(event);
      }
    },
  });

  const success = response.status.toString().match(/^(2|3)\d{2}$/) != null;

  if (success) {
    client.post("/start", { Key });
  }

  return success;
};
