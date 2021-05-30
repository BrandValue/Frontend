import React, {useRef, useCallback, useState, useEffect} from 'react';

function InfiniteScroll(props) {
    const {data, loading, onPageEnd} = props;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log('effect');
        setPosts([...posts, ...data]);
    }, [data]);
    const observer = useRef(null);
    const lastItem = useCallback((node) => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('visible');
                onPageEnd(0, 9);
            }
        });
        if (node) {
            observer.current?.observe(node);
        }
        console.log(node);
    }, []);
    return (
        <>
            {
                posts.map((elem, idx) => {
                    if (idx === posts.length - 1) {
                        return (<li ref={lastItem}>{elem.msg}</li>);
                    } else {
                        return (<li>{elem.msg}</li>);
                    }
                })
            }
        </>
    );
}

export default InfiniteScroll;
