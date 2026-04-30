export default function App() {
  return (
    <div className="flex flex-row">
      <div className="top-0 left-0 fixed w-[60%] h-svh">
        <img
          src="together.jpg"
          className="sepia-50 w-full h-full object-cover object-top"
        />
      </div>
      <div className="ml-[60%] w-full">
        <div className="bg-red-400 h-svh">
          <p className="left-0 absolute text-background">06</p>
          hello
        </div>
        <div className="bg-blue-400 w-full h-svh">
          <p className="left-0 absolute text-background">06</p>
          hello
        </div>
      </div>
    </div>
  );
}
