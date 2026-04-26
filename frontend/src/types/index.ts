import {SerializableContent} from "@/lib/blocks/Block";

export enum POST_BLOCK_TYPE {
    TITLE = "MainTitle",
    DATE = "Date",
    COVER = "Cover",
    TEXT_TITLE = "TextTitle",
    TEXT = "Text" ,
    IMAGES = "Images",
    CODE = "Code",
    DESCRIPTION = "Description"
}

export type PostBlock<T extends SerializableContent> = {
    id: number,
    type: POST_BLOCK_TYPE,
    content: T
}
