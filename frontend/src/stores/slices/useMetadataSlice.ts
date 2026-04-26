import { StateCreator } from 'zustand';
import { formatDate } from '@/utils/utils';
import {PostDTO} from "@/api";
import {SetOptional} from "type-fest";

export type MetadataSlice = SetOptional<PostDTO, 'id'> & {
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setCreatedAt: (createdAt: string) => void;
  setCovers: (covers: string[]) => void;
  setDescription: (description: string) => void;
  setSection: (section?: string) => void;
}

export const createMetadataSlice: StateCreator<MetadataSlice> = set => ({
  id: undefined,
  title: '',
  createdAt: formatDate(new Date(Date.now())),
  covers: [],
  description: '',
  section: undefined,
  slug: undefined,
  deleted: false,
  published: false,
  tags: [],
  content: [],
  setId: id => set({ id }),
  setTitle: title => set({ title }),
  setCreatedAt: createdAt => set({ createdAt }),
  setCovers: covers => set({ covers }),
  setDescription: description => set({ description }),
  setSection: section => set({ section }),
});
