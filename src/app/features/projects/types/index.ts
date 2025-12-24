export type AddProjectForm = {
  title: string;
  description: string;
};
export interface UploadedImage {
  url: string;
  publicId: string;
}

export interface AddProjectPayload extends AddProjectForm {
  imgUrls?: UploadedImage[];
}

export interface IProjectData {
  title: string;
  description: string;
  imgUrls?: UploadedImage[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  _id: string;
}
