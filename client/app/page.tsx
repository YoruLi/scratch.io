import CreateRoom from "@/components/create-room";
import Footer from "@/components/ui/footer";
import JoinRoomButton from "@/components/join-room";
import Link from "next/link";

export default async function Home() {
  const roomId = crypto.randomUUID();
  return (
    <>
      <header className="text-4xl text-scratch font-bold m-10 cursor-pointer flylight-green">
        <Link href={"/"}>Scratch.io</Link>
      </header>
      <main className="h-full w-full lg:p-12 p-6 *:z-[10] mx-auto flex justify-center">
        <div className="flex flex-col justify-center h-full w-full flylight max-w-md ">
          <h3 className="text-[#cf9dfd] fomt-bold text-5xl flylight-purple text-center ">
            Draw what is in your mind
          </h3>
          <p className="text-scratch fomt-bold text-center text-lg my-10 flylight-green text-pretty ">
            Create a room and share it so you can play with friends
          </p>
          <div className="flex flex-col gap-2 my-6">
            <CreateRoom
              roomId={roomId}
              className="w-full bg-transparent text-scratch hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90] font-bold rounded-md"
            />
            <span className="text-xs text-muted-foreground m-auto px-2">OR</span>
            <JoinRoomButton className="w-full bg-transparent text-scratch hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90] font-bold rounded-md" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
