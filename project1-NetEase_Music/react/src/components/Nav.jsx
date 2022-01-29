import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { SiGooglepodcasts } from 'react-icons/si';
import { BiMusic } from 'react-icons/bi';
import { MdOutlinePeopleAlt, MdPersonOutline } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrent } from '../state/NavSlice';

const activeStyle = `text-white rounded-full bg-red-500 p-1 sm:text-4xl`;

// fix width(for desktop) and height(for mobile) to 60px
const Nav = () => {
    // Use redux to control the nav icon status
    const dispatch = useDispatch();
    const current = useSelector(state => state.nav.current);

    return (
        //use tailwind css to make it responsitive to different screen size: (1) veritical for desktop (2) horizontal for mobile
        < div className="bg-white border fixed bottom-0 h-[60px] w-screen sm:left-0 sm:h-screen sm:w-[100px] flex justify-evenly items-center sm:flex-col" >
            <RiNeteaseCloudMusicLine className={`text-2xl sm:text-3xl ${current == 0 && activeStyle}`} onClick={() => dispatch(setCurrent(0))} />
            <SiGooglepodcasts className={`text-2xl sm:text-3xl ${current == 1 && activeStyle}`} onClick={() => dispatch(setCurrent(1))} />
            <BiMusic className={`text-2xl sm:text-3xl ${current == 2 && activeStyle}`} onClick={() => dispatch(setCurrent(2))} />
            <MdOutlinePeopleAlt className={`text-2xl sm:text-3xl ${current == 3 && activeStyle}`} onClick={() => dispatch(setCurrent(3))} />
            <MdPersonOutline className={`text-2xl sm:text-3xl ${current == 4 && activeStyle}`} onClick={() => dispatch(setCurrent(4))} />
        </div>
    );
}

export default Nav