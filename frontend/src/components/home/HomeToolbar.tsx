"use client";

import {useEffect, useState} from "react";
import SectionButton from "@/components/home/SectionButton";
import useSearchStore from "@/stores/useSearchStore";
import {SearchBar} from "@/components/home/SearchBar";
import {PostControllerService} from "@/api";

export default function HomeToolbar() {
    const [selectedSection, setSelectedSection] = useState<string>('Everything');
    const [sections, setSections] = useState<string[]>([])
    const fullSections = ["Everything", ...sections];
    const setSearchSection = useSearchStore((state) => state.setSection);
    const search = useSearchStore((state) => state.search);

    useEffect(() => {
        setSearchSection(selectedSection === "Everything" ? undefined : selectedSection);
        search();
    }, [selectedSection, setSearchSection, search]);

    useEffect(() => {
        PostControllerService.getSections().then((response) => {
            setSections(response.data || []);
        });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-screen-2xl flex sm:hidden w-full h-[4.5rem] text-nowrap border-2 border-r-0 border-l-0 border-neutral">
                <SearchBar />
            </div>

            <div className="max-w-screen-2xl hidden sm:flex sm:border-t-2 w-full border-t-0 h-[4.5rem] text-nowrap border-2 border-x-0 border-neutral sm:px-9">
                {fullSections.map((section, index) => (
                    <SectionButton
                        key={section}
                        text={section}
                        selected={section === selectedSection}
                        onClick={() => setSelectedSection(section)}
                        className={index === 0 ? "border-l-2" : ""}
                    />
                ))}
                <SearchBar />
            </div>
        </div>
    );
}