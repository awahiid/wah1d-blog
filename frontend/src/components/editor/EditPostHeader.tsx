import DateEditor from "@/components/editor/block-editors/DateEditor";
import TitleEditor from "@/components/editor/block-editors/TitleEditor";
import CoverEditor from "@/components/editor/block-editors/CoverEditor";
import DescriptionEditor from "@/components/editor/block-editors/DescriptionEditor";
import usePostStore from '@/stores/usePostStore';
import {formatDate} from "@/utils/utils";
import {SectionEditor} from "@/components/editor/block-editors/SectionEditor";

export default function EditPostHeader() {
  const title = usePostStore(state => state.title);
  const setTitle = usePostStore(state => state.setTitle);
  const date = usePostStore(state => state.createdAt);
  const setDate = usePostStore(state => state.setCreatedAt);
  const description = usePostStore(state => state.description);
  const setDescription = usePostStore(state => state.setDescription);
  const section = usePostStore(state => state.section);
  const setSection = usePostStore(state => state.setSection);
  const editable = usePostStore(state => state.editable);

  return (
    <header className={"flew-full max-w-screen-xl max-h-[660px] h-[68vh] sm:px-9 flex flex-col-reverse sm:flex-row w-full overflow-hidden border-b-2 border-neutral"}>
      <div className={"w-full h-full p-9 flex flex-col gap-9 justify-center relative"}>
          <SectionEditor content={section} editable={editable} onEdit={setSection}/>
          <DateEditor content={formatDate(new Date(date))} editable={editable} onEdit={setDate}/>
          <TitleEditor content={title} editable={editable} onEdit={setTitle}/>
        <div className={"h-full max-h-20"}>
          <DescriptionEditor content={description} editable={editable} onEdit={setDescription}/>
        </div>
      </div>
      <CoverEditor/>
    </header>
  );
}
