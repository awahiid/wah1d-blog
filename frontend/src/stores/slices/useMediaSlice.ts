import { StateCreator } from 'zustand';
import usePostStore from '@/stores/usePostStore';
import {MediaControllerService} from "@/api";

export type MediaSlice = {
  uploadCover: (cover: File) => Promise<string>;
  uploadMedia: (file: File) => Promise<string>;
  deleteMedia: (fileName: string) => Promise<void>;
};

export const createMediaSlice: StateCreator<MediaSlice> = () => ({
  uploadCover: async (cover: File) => {
    const id = usePostStore.getState().id;

    if (id == null) {
      throw new Error('Unable to upload the cover, post id is null.');
    }

    const response = await MediaControllerService.uploadMedia({ body: { file: cover }, path: { postId: id }});

    if(response.data != undefined) {
      return response.data;
    }else {
      throw new Error("Unable to upload the image. Something went wrong." );
    }
  },

  uploadMedia: async (file: File) => {
    const id = usePostStore.getState().id;

    if (id == null) {
      throw new Error('Unable to upload the media file, post id is null.');
    }

    const response = await MediaControllerService.uploadMedia({ body: { file }, path: { postId: id }});

    if(response.data != undefined) {
      return response.data;
    }else {
      throw new Error("Unable to upload the media file. Something went wrong." );
    }
  },

  deleteMedia: async (fileName: string) => {
    const { id } = usePostStore.getState();

    if (id == null) {
      throw new Error('Unable to delete the media file, post id is null.');
    }

    await MediaControllerService.deleteMedia({ path: { postId: id, fileName}});
  }
});
