import useConfigStore from "@/stores/useConfigStore";


type SectionEditor = {
    content?: string;
    editable: boolean;
    onEdit: (section?: string) => void;
}

export function SectionEditor({content, editable, onEdit}: SectionEditor) {
    const sections = useConfigStore(state => state.sections);

    return <select
        defaultValue={content ?? ""}
        className={'w-fit absolute top-9 bg-none font-bold bg-transparent pr-2 outline-none rounded-full appearance-none disabled:opacity-100'}
        onChange={(e) => onEdit(e.target.value)}
        disabled={!editable}
    >
        <option value=""> {editable && 'No section'} </option>
        { sections.map((section) => (<option value={section} key={section} className={'border-none px-2 appearance-none'}>{section}</option>)) }
    </select>
}