export function Title(props) {
  return (
    <div className="bg-white w-1/3 max-h-full py-20 pl-10">
      <h1 className="text-6xl text-green-400 font-extrabold">
        {props.info.title}
      </h1>
      <h2 className="text-2xl py-2 font-bold">{props.info.subtitle}</h2>
    </div>
  );
}
