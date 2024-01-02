import CreateRoom from "@/components/ui/create-room";
import Footer from "@/components/ui/footer";
import JoinRoomButton from "@/components/ui/join-room";
import Link from "next/link";

export default async function Home() {
  const roomId = crypto.randomUUID();
  return (
    <>
      <header className="text-4xl text-[#3ecb8f] font-bold m-10  cursor-pointer flylight-green">
        <Link href={"/"}>Scratch.io</Link>
      </header>
      <main className="min-h-dvh w-full lg:p-12 p-6 *:z-[10] mx-auto flex justify-center">
        <div className="flex flex-col justify-center h-full w-full flylight text-pretty max-w-[46ch]  ">
          <h3 className="text-[#cf9dfd] fomt-bold text-5xl flylight-purple">
            Draw what is in your mind
          </h3>
          <p className="text-[#3ecb8f] fomt-bold text-lg my-10 flylight-green">
            Create a room and share it so you can play with friends
          </p>
          <div className="flex  flex-col gap-2 my-6">
            <CreateRoom
              roomId={roomId}
              className="w-full bg-transparent text-[#3ecb8f] hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90]  font-bold rounded-full"
            />
            <span className="text-xs text-muted-foreground m-auto px-2">
              OR
            </span>
            <JoinRoomButton className="w-full bg-transparent text-[#3ecb8f] hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90] font-bold rounded-full" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
