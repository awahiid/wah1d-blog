export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className={'relative bg-gradient-to-b from-white via-white to-white/90 my-40 m-auto w-2/6 z-10 gap-10 flex border border-white shadow-2xl shadow-neutral flex-col p-10'}>
            {children}
        </div>
    )
}