import { current } from '@reduxjs/toolkit';
import { useState, useEffect, useRef } from 'react';
//Slidable pages
//user can slide to left or right to switch pages

const SlidablePages = () => {
    const sliderRef = useRef();

    const [startP, setStartP] = useState({ x: 0, y: 0 });
    const [currentP, setCurrentP] = useState({ x: 0, y: 0 });
    const [endP, setEndP] = useState({ x: 0, y: 0 });
    const [lastP, setLastP] = useState({ x: 0, y: 0 });

    const [currentPage, setCurrentPage] = useState(0);
    const [clientSize, setClientSize] = useState({ width: window.document.body.clientWidth, height: window.document.body.clientHeight });
    const handleResize = () => {
        setClientSize({ width: window.document.body.clientWidth, height: window.document.body.clientHeight });
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const children = [
        {
            bg: "bg-red-500",
        },
        {
            bg: "bg-blue-500",
        },
        {
            bg: "bg-purple-500",
        }
    ]


    const handleTouchMove = (e) => {
        setCurrentP({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }

    const handleTouchStart = (e) => {
        setStartP({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }

    const handleTouchEnd = (e) => {

        let { x, y } = getCurrentOffset()
        let newLastP = { x: x + lastP.x, y: y + lastP.y }

        //check out of bound
        const slider = sliderRef.current
        let firstChildOffsetLeft = slider.children[0].offsetLeft
        let lastChildOffsetLeft = slider.children[slider.children.length - 1].offsetLeft
        let firstChildOffsetTop = slider.children[0].offsetTop
        let lastChildOffsetTop = slider.children[slider.children.length - 1].offsetTop
        if (firstChildOffsetLeft > 0 || firstChildOffsetTop > 0) {
            newLastP = { x: 0, y: 0 }
        }
        if (lastChildOffsetLeft < 0 || lastChildOffsetTop < 0) {
            newLastP = { x: -clientSize.width * (slider.children.length - 1), y: -clientSize.height * (slider.children.length - 1) }
        }

        // get target child
        let target = slider.children[currentPage]

        //change between two pages
        if (
            (target.offsetLeft < 0 && Math.abs(target.offsetLeft) > clientSize.width / 4 && currentPage < slider.children.length - 1)
            ||
            (target.offsetTop < 0 && Math.abs(target.offsetTop) > clientSize.height / 4 && currentPage < slider.children.length - 1)
        ) {
            newLastP = { x: -(currentPage + 1) * clientSize.width, y: -(currentPage + 1) * clientSize.height }
            setCurrentPage(currentPage + 1)
        } else if (
            (target.offsetLeft > 0 && Math.abs(target.offsetLeft) > clientSize.width / 4 && currentPage > 0)
            ||
            (target.offsetTop > 0 && Math.abs(target.offsetTop) > clientSize.height / 4 && currentPage > 0)
        ) {
            newLastP = { x: -(currentPage - 1) * clientSize.width, y: -(currentPage - 1) * clientSize.height }
            setCurrentPage(currentPage - 1)
        } else {
            newLastP = { x: -(currentPage) * clientSize.width, y: -currentPage * clientSize.height }
        }
        // animateSlide(newLastP)
        setLastP({ x: newLastP.x, y: newLastP.y });
        setCurrentP({ x: 0, y: 0 });
        setStartP({ x: 0, y: 0 });
        setEndP({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    }


    const animateSlide = (newLastP) => {
        const { x, y } = getCurrentOffset()
        let diff = { x: newLastP.x - lastP.x - x, y: newLastP.y - lastP.y - y }
        let currentDiff = () => ({ x: newLastP.x - lastP.x - x, y: newLastP.y - lastP.y - y })
        let id = null
        clearInterval(id)
        id = setInterval(() => {
            const cd = currentDiff()
            if (cd.x < 0.01 && cd.y < 0.01){
                clearInterval(id)
                return
            }
            setLastP({ x: lastP.x + diff.x / 10, y: lastP.y + diff.y / 10 })
        }, 20)
        // console.log(lastP.x, lastP.y)
        // console.log(getCurrentOffset())
        // console.log(newLastP.x, newLastP.y)
    }

    const getCurrentOffset = () => {
        return { x: currentP.x != 0 ? currentP.x - startP.x : 0, y: currentP.y != 0 ? currentP.y - startP.y : 0 }
    }

    const responsitiveStyle = (props) => {
        if (clientSize.width < 640) {
            return {
                left: props.index * clientSize.width + lastP.x + getCurrentOffset().x + "px"
            }
        } else {
            return {
                top: props.index * clientSize.height + lastP.y + getCurrentOffset().y + "px"
            }
        }
    }

    return (
        <ul ref={sliderRef} className="w-screen h-screen" onTouchMove={handleTouchMove} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {children.map((item, index) => {
                return (
                    <li key={index} className={`w-screen h-screen fixed ${item.bg}`} style={responsitiveStyle({ index })}>
                        {getCurrentOffset().x}
                        <br />
                        {lastP.x}
                        <div className='w-1/2 h-1/2 bg-blue-200'>
                            <ul className='flex overflow-scroll' onTouchStart={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}>
                                <li className='flex-none w-full'>1</li>
                                <li>1</li>
                                <li>1</li>
                            </ul>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}

export default SlidablePages;