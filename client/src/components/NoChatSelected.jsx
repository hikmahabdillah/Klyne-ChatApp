const NoChatSelected = () => {
  return (  
    <div className="hidden md:flex md:h-screen md:justify-center md:items-center box w-full overflow-auto flex-1 flex-col gap-3">
      <img className="w-20 animate-bounce" src="./Main Logo.svg" alt="Logo Klyne" width="45px" />
      <h1 className="text-3xl font-bold text-center animate-scaleUp">Welcome To Klyne Chat!</h1>
      <p className="text-base-content animate-scaleUp">Select a conversation from the sidebar to start chatting</p>
    </div>
  )
}

export default NoChatSelected;