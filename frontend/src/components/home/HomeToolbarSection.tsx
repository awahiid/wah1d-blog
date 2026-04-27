import HomeToolbar from "@/components/home/HomeToolbar";
import React from "react";
import {PostControllerService} from "@/api";

export async function HomeToolbarSection() {
    const sectionsPage = await PostControllerService.getSections();
    const sections = sectionsPage.data || []

    return  <HomeToolbar sections={sections}/>
}