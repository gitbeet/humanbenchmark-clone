import { useAppDispatch } from "../utilities/hooks";
import { toggleMobileMenu } from "../features/modals/modalsSlice";
const MobileButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(toggleMobileMenu())}
      className="block md:hidden relative h-3 w-4 cursor-pointer"
    >
      <div className="absolute  top-0 w-4 h-[2px] bg-neutral-900 "></div>
      <div className="absolute  top-1/2 w-4 h-[2px] bg-neutral-900"></div>
      <div className="absolute  top-full w-4 h-[2px] bg-neutral-900"></div>
    </div>
  );
};

export default MobileButton;
