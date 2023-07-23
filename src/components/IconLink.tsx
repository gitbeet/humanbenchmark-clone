import { Link } from "react-router-dom";

interface Props {
  text: string;
  icon: JSX.Element;
  link: string;
}

const IconLink = ({ text, icon, link }: Props) => {
  return (
    <Link
      to={link}
      className="flex gap-1 justify-center items-center text-light-blue hover:text-neutral-900"
    >
      <div className="scale-100">{icon}</div>
      <p className="hover:underline text-lg">{text}</p>
    </Link>
  );
};

export default IconLink;
