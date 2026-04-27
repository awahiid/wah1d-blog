export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className={'relative bg-gradient-to-b from-white via-white to-white/90 sm:my-40 m-auto sm:w-2/6 z-10 gap-10 flex border border-white sm:shadow-2xl sm:shadow-neutral flex-col p-10'}>
            {children}
        </div>
    )
}