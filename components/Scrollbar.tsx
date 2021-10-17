import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PerfectScrollbar from 'perfect-scrollbar';

//import 'perfect-scrollbar/css/perfect-scrollbar.css'
//import './scrollbar.css'

const Scrollbar = props => {

    const {
        className,
        //
        settings,
        ...attributes
    } = props

    const [instance, setInstance] = useState<PerfectScrollbar>()
    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        init();

        return () => {
            uninit();
        }
    }, [])

    const init = () => {
        if (!instance) {
            let scroll = new PerfectScrollbar(ref.current, settings);
            scroll.isRtl = true;
            setInstance(scroll)
        }
    }

    const uninit = () => {
        if (instance) {
            instance.destroy()
            setInstance(null)
        }
    }

    // render
    return (
        <div
            className={classNames( )}
            style={{ position: 'relative' ,height: '100px'}}
            {...attributes}
            ref={ref}
        />
    )
}

Scrollbar.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    //
    settings: PropTypes.object
};

Scrollbar.defaultProps = {
};

export default Scrollbar;