import useSearchStore from "@/stores/useSearchStore";
import {MdSearch} from "react-icons/md";
import React from "react";
import {useShallow} from "zustand/react/shallow";

export function SearchBar() {
    const {setQuery, search} = useSearchStore(
        useShallow(state => ({
            setQuery: state.setQuery,
            search: state.search
        }))
    );

    return (
        <>
            <input
                type="text"
                placeholder="Search by name"
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") search()
                }}
                className="h-full w-full flex items-center pl-9 pr-9 border-r-2 border-neutral focus:z-10 focus:outline focus:outline-2 focus:outline-black focus:rounded-none rounded-none"
            />
            <button
                onClick={search}
                className="min-w-[4.5rem] flex items-center justify-center sm:border-r-2 border-neutral bg-black cursor-pointer"
            >
                <MdSearch className="fill-white size-7"/>
            </button>
        </>
    );
}