
const GraphIcon = ({theme, start, direction, align, mirrorx, mirrory}) => {
    // switch(direction){
    //     case 'left':
    //         return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.58 64.2"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M9.32,59.7V4.5c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/><path class="cls-1" d="M32.45,59.7V23.35c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/><path class="cls-1" d="M54.58,59.7V46.37c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/></g></g></svg>
    //     case 'right':
    //         return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.58 64.2"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M54.58,59.7V4.5c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/><path class="cls-1" d="M31.45,59.7V23.35c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/><path class="cls-1" d="M9.32,59.7V46.37c0-6-9.32-6-9.32,0V59.7c0,6,9.32,6,9.32,0Z"/></g></g></svg>
    //     case 'up':
    //         return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.58 64.2"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M0,4.5V59.7c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/><path class="cls-1" d="M23.13,4.5V40.85c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/><path class="cls-1" d="M45.26,4.5V17.82c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/></g></g></svg>
    //     default:
    //         return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.58 64.2"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M0,4.5V59.7c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/><path class="cls-1" d="M23.13,4.5V40.85c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/><path class="cls-1" d="M45.26,4.5V17.82c0,6,9.32,6,9.32,0V4.5c0-6-9.32-6-9.32,0Z"/></g></g></svg>
    // }

    let style = {
        height: '150px',
    };

    console.log(mirrorx+" : "+mirrory);
    // linear, base
    const color = theme.text2;

    const graph1 = (style) => { 
        return (
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={theme.blue} fillOpacity="40%" d="M165.28,108.43v77.64c0,6.91,24.49,13.33,24.49,5.16V113.59c0-6.91-24.49-13.33-24.49-5.16Z"/>
                <path fill={theme.blue} fillOpacity="40%"  d="M205.62,141.07v45c0,6.91,24.49,13.33,24.49,5.16v-45c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path fill={theme.blue} fillOpacity="40%" d="M125,55.86V186.07c0,6.91,24.49,13.33,24.49,5.16V61c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path fill={theme.blue} fillOpacity="40%" d="M44.27,38.15V186.07c0,6.91,24.49,13.33,24.49,5.16V43.32c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path fill={theme.blue} fillOpacity="40%" d="M84.61,85.19V186.07c0,6.91,24.49,13.33,24.49,5.16V90.35c0-6.91-24.49-13.33-24.49-5.16Z"/>
                <path fill={theme.blue} fillOpacity="40%" d="M3.94,7.76V186.07c0,6.91,24.49,13.33,24.49,5.16V12.93C28.43,6,3.94-.41,3.94,7.76Z"/>
                <path fill={color} stroke-width='2px' d="M53.43,220.4H172.32c1.6,0,3.24.12,4.84,0a1.47,1.47,0,0,1,.21,0c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.75-3.18-3.48-3.18H56.47c-1.6,0-3.25-.12-4.85,0h-.21c-1.73,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M180.34,215.33l-9.59-7.88a2.19,2.19,0,0,0-3.59,1.7v15.76a2.19,2.19,0,0,0,3.59,1.7l9.59-7.88A2.2,2.2,0,0,0,180.34,215.33Z"/>
            </svg>
        )
    };

    // linear, center
    const graph2 = (style) => { 
        return ( 
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path class="cls-1" d="M165.28,58.1v77.63c0,6.92,24.49,13.34,24.49,5.17V63.26c0-6.91-24.49-13.34-24.49-5.16Z"/>
                <path class="cls-1" d="M205.62,74.42v45c0,6.91,24.49,13.34,24.49,5.17v-45c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path class="cls-1" d="M125,31.81V162c0,6.91,24.49,13.34,24.49,5.16V37c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path class="cls-1" d="M44.27,23V170.87c0,6.91,24.49,13.34,24.49,5.17V28.13c0-6.91-24.49-13.34-24.49-5.17Z"/>
                <path class="cls-1" d="M84.61,46.48V147.35c0,6.91,24.49,13.34,24.49,5.17V51.64c0-6.91-24.49-13.33-24.49-5.16Z"/>
                <path class="cls-1" d="M3.94,7.76V186.07c0,6.91,24.49,13.33,24.49,5.16V12.93C28.43,6,3.94-.41,3.94,7.76Z"/>
                <path fill={color} stroke-width='2px' d="M53.43,220.4H172.32c1.6,0,3.24.12,4.84,0a1.47,1.47,0,0,1,.21,0c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.75-3.18-3.48-3.18H56.47c-1.6,0-3.25-.12-4.85,0h-.21c-1.73,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M180.34,215.33l-9.59-7.88a2.19,2.19,0,0,0-3.59,1.7v15.76a2.19,2.19,0,0,0,3.59,1.7l9.59-7.88A2.2,2.2,0,0,0,180.34,215.33Z"/>
            </svg>
        )
    };

    const graph3 = (style) => { 
        return ( 
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M53.43,220.4H172.32c1.6,0,3.24.12,4.84,0a1.47,1.47,0,0,1,.21,0c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.75-3.18-3.48-3.18H56.47c-1.6,0-3.25-.12-4.85,0h-.21c-1.73,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M180.34,215.33l-9.59-7.88a2.19,2.19,0,0,0-3.59,1.7v15.76a2.19,2.19,0,0,0,3.59,1.7l9.59-7.88A2.2,2.2,0,0,0,180.34,215.33Z"/>
                <path class="cls-2" d="M220.38,194.85h-5.2c-5.33,0-9.65-3.79-9.65-8.46V173.22c0-8.64,24.5-1.84,24.5,5.48v7.69C230,191.06,225.71,194.85,220.38,194.85Z"/>
                <path class="cls-2" d="M180.05,194.85h-5.17c-5.33,0-9.65-3.79-9.65-8.46V157c0-8.64,24.47-1.84,24.47,5.47v24C189.7,191.06,185.38,194.85,180.05,194.85Z"/>
                <path class="cls-2" d="M139.73,194.85h-5.18c-5.33,0-9.65-3.79-9.65-8.46V154c0-8.67,24.47-1.84,24.47,5.47v27C149.37,191.06,145.05,194.85,139.73,194.85Z"/>
                <path class="cls-2" d="M99.4,194.85H94.22c-5.33,0-9.65-3.79-9.65-8.46V134.63c0-8.66,24.48-1.86,24.48,5.47v46.29C109.05,191.06,104.73,194.85,99.4,194.85Z"/>
                <path class="cls-2" d="M59.1,194.85H53.89c-5.33,0-9.64-3.79-9.64-8.46V142.05c0-8.66,24.49-1.83,24.49,5.48v38.86C68.74,191.06,64.43,194.85,59.1,194.85Z"/>
                <path class="cls-2" d="M18.77,194.85H13.59c-5.33,0-9.65-3.79-9.65-8.46V112.15c0-8.67,24.48-1.86,24.48,5.47v68.77C28.42,191.06,24.1,194.85,18.77,194.85Z"/>
                <path class="cls-2" d="M220.38,3.94h-5.2c-5.33,0-9.65,3.79-9.65,8.47V25.58c0,8.64,24.5,1.83,24.5-5.48V12.41C230,7.73,225.71,3.94,220.38,3.94Z"/>
                <path class="cls-2" d="M180.05,3.94h-5.17c-5.33,0-9.65,3.79-9.65,8.47V41.85c0,8.64,24.47,1.83,24.47-5.48v-24C189.7,7.73,185.38,3.94,180.05,3.94Z"/>
                <path class="cls-2" d="M139.73,3.94h-5.18c-5.33,0-9.65,3.79-9.65,8.47V44.85c0,8.66,24.47,1.83,24.47-5.48v-27C149.37,7.73,145.05,3.94,139.73,3.94Z"/>
                <path class="cls-2" d="M99.4,3.94H94.22c-5.33,0-9.65,3.79-9.65,8.47V64.17c0,8.66,24.48,1.85,24.48-5.48V12.41C109.05,7.73,104.73,3.94,99.4,3.94Z"/>
                <path class="cls-2" d="M59.1,3.94H53.89c-5.33,0-9.64,3.79-9.64,8.47V56.74c0,8.66,24.49,1.84,24.49-5.48V12.41C68.74,7.73,64.43,3.94,59.1,3.94Z"/>
                <path class="cls-2" d="M18.77,3.94H13.59c-5.33,0-9.65,3.79-9.65,8.47V86.65c0,8.66,24.48,1.85,24.48-5.48V12.41C28.42,7.73,24.1,3.94,18.77,3.94Z"/>
            </svg>
        )
    };

    const graph4 = (style) => { 
        return  (
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M183,213.55h-44.8c-1.73,0-1.8,2.4-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18H185c1.72,0,1.8-2.39,1.45-3.55-.45-1.53-1.74-3.19-3.47-3.19Z"/>
                <path fill={color} stroke-width='2px' d="M135.25,218.62l9.59,7.88a2.19,2.19,0,0,0,3.59-1.69V209a2.2,2.2,0,0,0-3.59-1.7l-9.59,7.89A2.19,2.19,0,0,0,135.25,218.62Z"/>
                <path fill={color} stroke-width='2px' d="M49.08,220.29H93.87c1.73,0,1.81-2.39,1.46-3.55-.45-1.53-1.75-3.19-3.48-3.19H47.06c-1.73,0-1.81,2.4-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M96.84,215.23l-9.59-7.89a2.19,2.19,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.2,2.2,0,0,0,96.84,215.23Z"/>
                <path class="cls-2" d="M109,191.11V113.52c0-6.9-24.47-13.33-24.47-5.16V186c0,6.91,24.47,13.33,24.47,5.16Z"/>
                <path class="cls-2" d="M124.86,191.11V113.52c0-6.9,24.47-13.33,24.47-5.16V186c0,6.91-24.47,13.33-24.47,5.16Z"/>
                <path class="cls-2" d="M44.24,55.83V186c0,6.91,24.47,13.33,24.47,5.16V61c0-6.91-24.47-13.33-24.47-5.16Z"/>
                <path class="cls-2" d="M3.94,7.76V186c0,6.91,24.47,13.33,24.47,5.16V12.92C28.41,6,3.94-.41,3.94,7.76Z"/>
                <path class="cls-2" d="M165.17,191.11V61c0-6.91,24.47-13.33,24.47-5.16V186c0,6.91-24.47,13.33-24.47,5.16Z"/>
                <path class="cls-2" d="M205.47,191.11V12.92c0-6.9,24.47-13.33,24.47-5.16V186c0,6.91-24.47,13.33-24.47,5.16Z"/>
            </svg>
        )
    };

    const graph5 = (style) => { 
        return (
            <svg 
                style={style} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M183,213.55h-44.8c-1.73,0-1.8,2.4-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18H185c1.72,0,1.8-2.39,1.45-3.55-.45-1.53-1.74-3.19-3.47-3.19Z"/>
                <path fill={color} stroke-width='2px' d="M135.25,218.62l9.59,7.88a2.19,2.19,0,0,0,3.59-1.69V209a2.2,2.2,0,0,0-3.59-1.7l-9.59,7.89A2.19,2.19,0,0,0,135.25,218.62Z"/>
                <path fill={color} stroke-width='2px' d="M49.08,220.29H93.87c1.73,0,1.81-2.39,1.46-3.55-.45-1.53-1.75-3.19-3.48-3.19H47.06c-1.73,0-1.81,2.4-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M96.84,215.23l-9.59-7.89a2.19,2.19,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.2,2.2,0,0,0,96.84,215.23Z"/>
                <path class="cls-2" d="M108.5,141.33V63.44c0-6.93-24.35-13.38-24.35-5.18v77.89c0,6.93,24.35,13.38,24.35,5.18Z"/>
                <path class="cls-2" d="M148.61,141.33V63.44c0-6.93-24.35-13.38-24.35-5.18v77.89c0,6.93,24.35,13.38,24.35,5.18Z"/>
                <path class="cls-2" d="M44,31.9V162.51c0,6.93,24.35,13.38,24.35,5.18V37.08C68.39,30.15,44,23.7,44,31.9Z"/>
                <path class="cls-2" d="M3.93,7.77V186.63c0,6.94,24.35,13.38,24.35,5.19V13C28.28,6,3.93-.42,3.93,7.77Z"/>
                <path class="cls-2" d="M188.72,167.69V37.08c0-6.93-24.35-13.38-24.35-5.18V162.51c0,6.93,24.35,13.38,24.35,5.18Z"/>
                <path class="cls-2" d="M228.83,191.82V13c0-6.94-24.35-13.38-24.35-5.19V186.63c0,6.94,24.35,13.38,24.35,5.19Z"/>
            </svg>
        )
    };

    const graph6 = (style) => { 
        return (
            <svg 
                style={style} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path class="cls-1" d="M212.92,195.8h9.37c4.17,0,7.55-2.48,7.55-5.55V114.46c0-7.24-24.47-1.54-24.47,4.59v71.2C205.37,193.32,208.75,195.8,212.92,195.8Z" />
                <path class="cls-1" d="M172.61,195.8H182c4.15,0,7.51-2.47,7.51-5.52V135.79c0-7.24-24.45-1.55-24.45,4.58v49.91C165.09,193.33,168.46,195.8,172.61,195.8Z" />
                <path class="cls-1" d="M132.82,195.8h8.43c4.43,0,8-2.64,8-5.89V159.09c0-7.24-24.47-1.54-24.47,4.59v26.23C124.8,193.16,128.39,195.8,132.82,195.8Z" />
                <path class="cls-1" d="M101.35,195.8h-9.2c-4.21,0-7.63-2.51-7.63-5.6V159.09c0-7.24,24.45-1.54,24.45,4.59V190.2C109,193.29,105.56,195.8,101.35,195.8Z" />
                <path class="cls-1" d="M61.05,195.8h-9.2c-4.21,0-7.62-2.5-7.62-5.6V135.79c0-7.24,24.45-1.55,24.45,4.58V190.2C68.68,193.3,65.26,195.8,61.05,195.8Z" />
                <path class="cls-1" d="M20.75,195.8H11.58c-4.22,0-7.65-2.51-7.65-5.62V114.46c0-7.24,24.47-1.54,24.47,4.59v71.13C28.4,193.29,25,195.8,20.75,195.8Z" />
                <path class="cls-1" d="M212.92,3.93h9.37c4.17,0,7.55,2.48,7.55,5.55V85.27c0,7.24-24.47,1.54-24.47-4.59V9.48C205.37,6.41,208.75,3.93,212.92,3.93Z" />
                <path class="cls-1" d="M172.61,3.93H182c4.15,0,7.51,2.47,7.51,5.52V63.94c0,7.24-24.45,1.56-24.45-4.57V9.45C165.09,6.4,168.46,3.93,172.61,3.93Z" />
                <path class="cls-1" d="M132.82,3.93h8.43c4.43,0,8,2.64,8,5.89V40.64c0,7.25-24.47,1.54-24.47-4.58V9.82C124.8,6.57,128.39,3.93,132.82,3.93Z" />
                <path class="cls-1" d="M101.35,3.93h-9.2c-4.21,0-7.63,2.51-7.63,5.6V40.64c0,7.25,24.45,1.54,24.45-4.58V9.53C109,6.44,105.56,3.93,101.35,3.93Z" />
                <path class="cls-1" d="M61.05,3.93h-9.2c-4.21,0-7.62,2.51-7.62,5.6V63.94c0,7.24,24.45,1.56,24.45-4.57V9.53C68.68,6.44,65.26,3.93,61.05,3.93Z" />
                <path class="cls-1" d="M20.75,3.93H11.58c-4.22,0-7.65,2.52-7.65,5.62V85.27c0,7.24,24.47,1.54,24.47-4.59V9.55C28.4,6.45,25,3.93,20.75,3.93Z" />
                <path fill={color} stroke-width='2px' d="M183,213.55h-44.8c-1.73,0-1.8,2.4-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18H185c1.72,0,1.8-2.39,1.45-3.55-.45-1.53-1.74-3.19-3.47-3.19Z"/>
                <path fill={color} stroke-width='2px' d="M135.25,218.62l9.59,7.88a2.19,2.19,0,0,0,3.59-1.69V209a2.2,2.2,0,0,0-3.59-1.7l-9.59,7.89A2.19,2.19,0,0,0,135.25,218.62Z"/>
                <path fill={color} stroke-width='2px' d="M49.08,220.29H93.87c1.73,0,1.81-2.39,1.46-3.55-.45-1.53-1.75-3.19-3.48-3.19H47.06c-1.73,0-1.81,2.4-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M96.84,215.23l-9.59-7.89a2.19,2.19,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.2,2.2,0,0,0,96.84,215.23Z"/>
            </svg>
        )
    };

    const graph7 = (style) => { 
        return (
            <svg 
                style={style} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M135.8,220.64h44.8c1.73,0,1.8-2.39,1.46-3.56-.46-1.53-1.75-3.18-3.48-3.18h-44.8c-1.72,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M183.56,215.58,174,207.69a2.2,2.2,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.19,2.19,0,0,0,183.56,215.58Z"/>
                <path fill={color} stroke-width='2px' d="M97,213.9H52.18c-1.73,0-1.81,2.39-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18H99c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.74-3.18-3.48-3.18Z"/>
                <path fill={color} stroke-width='2px' d="M49.21,215.58l9.6-7.89a2.19,2.19,0,0,1,3.58,1.7v15.77a2.19,2.19,0,0,1-3.58,1.69L49.21,219A2.2,2.2,0,0,1,49.21,215.58Z"/>
                <path class="cls-2"d="M28.37,108.42v77.64c0,6.91-24.44,13.34-24.44,5.17V113.59c0-6.91,24.44-13.34,24.44-5.17Z" />
                <path class="cls-2" d="M205.18,108.42v77.64c0,6.91,24.43,13.34,24.43,5.17V113.59c0-6.91-24.43-13.34-24.43-5.17Z" />
                <path class="cls-2" d="M44.18,191.23V61c0-6.91,24.44-13.33,24.44-5.16v130.2c0,6.91-24.44,13.34-24.44,5.17Z" />
                <path class="cls-2" d="M84.43,191.23V12.93c0-6.91,24.44-13.34,24.44-5.17v178.3c0,6.91-24.44,13.34-24.44,5.17Z" />
                <path class="cls-2" d="M164.93,55.86v130.2c0,6.91,24.43,13.34,24.43,5.17V61c0-6.91-24.43-13.33-24.43-5.16Z" />
                <path class="cls-2"d="M124.68,7.76v178.3c0,6.91,24.44,13.34,24.44,5.17V12.93c0-6.91-24.44-13.34-24.44-5.17Z" />
            </svg>
        )
    };

    const graph8 = (style) => { 
        return (
            <svg 
                style={style} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M135.8,220.64h44.8c1.73,0,1.8-2.39,1.46-3.56-.46-1.53-1.75-3.18-3.48-3.18h-44.8c-1.72,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M183.56,215.58,174,207.69a2.2,2.2,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.19,2.19,0,0,0,183.56,215.58Z"/>
                <path fill={color} stroke-width='2px' d="M97,213.9H52.18c-1.73,0-1.81,2.39-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18H99c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.74-3.18-3.48-3.18Z"/>
                <path fill={color} stroke-width='2px' d="M49.21,215.58l9.6-7.89a2.19,2.19,0,0,1,3.58,1.7v15.77a2.19,2.19,0,0,1-3.58,1.69L49.21,219A2.2,2.2,0,0,1,49.21,215.58Z"/>
                <path class="cls-2" d="M3.93,58V135.4c0,6.89,24.39,13.3,24.39,5.15V63.1c0-6.89-24.39-13.3-24.39-5.15Z" />
                <path class="cls-2" d="M204.82,58V135.4c0,6.89,24.4,13.3,24.4,5.15V63.1c0-6.89-24.4-13.3-24.4-5.15Z" />
                <path class="cls-2" d="M68.5,166.77V36.89c0-6.9-24.4-13.31-24.4-5.16V161.62c0,6.89,24.4,13.3,24.4,5.15Z" />
                <path class="cls-2" d="M108.68,190.76V12.9c0-6.9-24.4-13.31-24.4-5.16V185.61c0,6.89,24.4,13.3,24.4,5.15Z" />
                <path class="cls-2" d="M164.64,31.73V161.62c0,6.89,24.4,13.3,24.4,5.15V36.89c0-6.9-24.4-13.31-24.4-5.16Z" />
                <path class="cls-2" d="M124.46,7.74V185.61c0,6.89,24.4,13.3,24.4,5.15V12.9c0-6.9-24.4-13.31-24.4-5.16Z" />
            </svg>
        )
    };

    const graph9 = (style) => { 
        return (
            <svg 
                style={style} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 234.05 240"
                fill='none'
                stroke={color}
                stroke-miterlimit={10}
                stroke-width='5px'
            >
                <path fill={color} stroke-width='2px' d="M135.8,220.64h44.8c1.73,0,1.8-2.39,1.46-3.56-.46-1.53-1.75-3.18-3.48-3.18h-44.8c-1.72,0-1.8,2.39-1.46,3.56.46,1.53,1.75,3.18,3.48,3.18Z"/>
                <path fill={color} stroke-width='2px' d="M183.56,215.58,174,207.69a2.2,2.2,0,0,0-3.59,1.7v15.77a2.19,2.19,0,0,0,3.59,1.69l9.59-7.88A2.19,2.19,0,0,0,183.56,215.58Z"/>
                <path fill={color} stroke-width='2px' d="M97,213.9H52.18c-1.73,0-1.81,2.39-1.46,3.56.45,1.53,1.75,3.18,3.48,3.18H99c1.73,0,1.81-2.39,1.46-3.56-.45-1.53-1.74-3.18-3.48-3.18Z"/>
                <path fill={color} stroke-width='2px' d="M49.21,215.58l9.6-7.89a2.19,2.19,0,0,1,3.58,1.7v15.77a2.19,2.19,0,0,1-3.58,1.69L49.21,219A2.2,2.2,0,0,1,49.21,215.58Z"/>
                <path class="cls-2" d="M142.05,194.87h-9.39c-4.18,0-7.57-2.47-7.57-5.52V113.93c0-7.21,24.53-1.54,24.53,4.56v70.86C149.62,192.4,146.23,194.87,142.05,194.87Z"/>
                <path class="cls-2" d="M182.45,194.87H173c-4.16,0-7.54-2.46-7.54-5.49V135.15c0-7.2,24.51-1.55,24.51,4.55v49.68C190,192.41,186.62,194.87,182.45,194.87Z"/>
                <path class="cls-2" d="M222.35,194.87h-8.46c-4.44,0-8-2.62-8-5.86V158.34c0-7.21,24.53-1.54,24.53,4.56V189C230.39,192.25,226.79,194.87,222.35,194.87Z"/>
                <path class="cls-2" d="M11.57,194.87h9.22c4.22,0,7.65-2.49,7.65-5.57v-31c0-7.21-24.51-1.54-24.51,4.56v26.4C3.93,192.38,7.35,194.87,11.57,194.87Z"/>
                <path class="cls-2" d="M52,194.87h9.23c4.22,0,7.64-2.49,7.64-5.57V135.15c0-7.2-24.51-1.55-24.51,4.55v49.6C44.32,192.38,47.74,194.87,52,194.87Z"/>
                <path class="cls-2" d="M92.36,194.87h9.19c4.24,0,7.67-2.5,7.67-5.59V113.93c0-7.21-24.53-1.54-24.53,4.56v70.79C84.69,192.37,88.13,194.87,92.36,194.87Z"/>
                <path class="cls-2" d="M142.05,3.93h-9.39c-4.18,0-7.57,2.47-7.57,5.52V84.87c0,7.21,24.53,1.53,24.53-4.57V9.45C149.62,6.4,146.23,3.93,142.05,3.93Z"/>
                <path class="cls-2" d="M182.45,3.93H173c-4.16,0-7.54,2.46-7.54,5.49V63.65c0,7.2,24.51,1.55,24.51-4.55V9.42C190,6.39,186.62,3.93,182.45,3.93Z"/>
                <path class="cls-2" d="M222.35,3.93h-8.46c-4.44,0-8,2.62-8,5.86V40.46c0,7.21,24.53,1.54,24.53-4.56V9.79C230.39,6.55,226.79,3.93,222.35,3.93Z"/>
                <path class="cls-2" d="M11.57,3.93h9.22c4.22,0,7.65,2.49,7.65,5.57v31c0,7.21-24.51,1.54-24.51-4.56V9.5C3.93,6.42,7.35,3.93,11.57,3.93Z"/>
                <path class="cls-2" d="M52,3.93h9.23c4.22,0,7.64,2.49,7.64,5.57V63.65c0,7.2-24.51,1.55-24.51-4.55V9.5C44.32,6.42,47.74,3.93,52,3.93Z"/>
                <path class="cls-2" d="M92.36,3.93h9.19c4.24,0,7.67,2.5,7.67,5.59V84.87c0,7.21-24.53,1.53-24.53-4.57V9.52C84.69,6.43,88.13,3.93,92.36,3.93Z"/>
            </svg>
        )
    };

    if(mirrorx && mirrory){
        switch(start){
            case 'top':
                if(direction == 'left') style = {...style, transform:'scale(-1, -1)'};
                else style = {...style, transform:'scale(1, -1)'};
                break;
            case 'left':
                if(direction == 'up') style = {...style, transform:'rotate(90deg) scale(-1, 1)'};
                else style = {...style, transform:'rotate(90deg) '};
                break;
            case 'right':
                if(direction == 'down') style = {...style, transform:'rotate(-90deg) scale(1, 1)'};
                else style = {...style, transform:'rotate(270deg)'};
                break;
            default:
                break;
        }
        
        if(align=='base') {
            if (direction=='left') return graph9(style)
            else return graph6(style)
        }
        else return graph9(style)
    }
    else if(mirrorx){
        if(start=='bottom'){
            if(align=='base'){
                if(direction=='right') return graph4(style)
                else return graph7(style)
            }
            else{
                if(direction=='right') return graph5(style)
                else return graph8(style)
            }
        }
        else if(start=='top'){
            style = {...style, transform:'scale(1, -1)'};
            if(align=='base'){
                if(direction=='right') return graph4(style)
                else return graph7(style)
            }
            else{
                if(direction=='right') return graph5(style)
                else return graph8(style)
            }
        }
        else if(start == 'left'){
            if(direction=='down'){
                style = {...style, transform:'rotate(90deg)'};
                if(align == 'base'){
                    return graph3(style);
                }
                else return graph2(style)
            }
            else{
                style = {...style, transform:'rotate(-90deg) scale(1,-1)'};
                if(align == 'base'){
                    return graph3(style);
                }
                else return graph2(style)
            }
        }
        else if(start == 'right'){
            if(direction=='down'){
                style = {...style, transform:'rotate(90deg) scale(1,-1)'};
                if(align == 'base'){
                    return graph3(style);
                }
                else return graph2(style)
            }
            else{
                style = {...style, transform:'rotate(-90deg) '};
                if(align == 'base'){
                    return graph3(style);
                }
                else return graph2(style)
            }
        }
    }
    else if(mirrory){
        if(start=='bottom' || start=='top'){
            if(start=='top' && direction=='left') style = {...style, transform:'scale(-1, -1)'};
            else if(start=='top') style = {...style, transform:'scale(1, -1)'};
            else if(direction=='left') style = {...style, transform:'scale(-1, 1)'};
            
            if(align=='base'){
                return graph3(style)
            }
            else{
                return graph2(style)
            }
        }
        else{
            if(start == 'left') style = {...style, transform:'scale(-1, 1) rotate(-90deg)'};
            else style = {...style, transform:'rotate(-90deg)'};
                if(align=='base'){
                    if(direction=='up') return graph4(style)
                    else return graph7(style)
                }
                else{
                    if(direction=='up') return graph5(style)
                    else return graph8(style)
                }
        }
    }
    else{
            switch(start){
                case 'bottom':
                    if(direction == 'left') style = {...style, transform:'scale(-1, 1)'};
                    break;
                case 'top':
                    if(direction == 'left') style = {...style, transform:'scale(-1, -1)'};
                    else style = {...style, transform:'scale(1, -1)'};
                    break;
                case 'left':
                    if(direction == 'up') style = {...style, transform:'rotate(90deg) scale(-1, 1)'};
                    else style = {...style, transform:'rotate(90deg) '};
                    break;
                case 'right':
                    if(direction == 'down') style = {...style, transform:'rotate(-90deg) scale(-1, 1)'};
                    else style = {...style, transform:'rotate(270deg)'};
                    break;
            }
            if(align == 'base') return graph1(style)
            else return graph2(style)
    
    
    }
    // switch(start){
    //     case 'bottom':
    //         if(direction == 'left') style = {...style, transform:'scale(-1, 1)'};
    //         break;
    //     case 'top':
    //         if(direction == 'left') style = {...style, transform:'scale(-1, -1)'};
    //         else style = {...style, transform:'scale(1, -1)'};
    //         break;
    //     case 'left':
    //         if(direction == 'up') style = {...style, transform:'rotate(90deg) scale(-1, 1)'};
    //         else style = {...style, transform:'rotate(90deg) '};
    //         break;
    //     case 'right':
    //         if(direction == 'down') style = {...style, transform:'rotate(-90deg) scale(-1, 1)'};
    //         else style = {...style, transform:'rotate(270deg)'};
    //         break;
    // }
    // if(align == 'base'){
    //     return(
    //         <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.59 55.07">
    //             <path class="cls-1" d="M0,50.08V5C0-1.66,10.32-1.67,10.32,5v45.1c0,6.64-10.32,6.66-10.32,0Z"/>
    //             <path class="cls-1" d="M18.64,50.08v-30c0-6.64,10.32-6.65,10.32,0v30c0,6.64-10.32,6.66-10.32,0Z"/>
    //             <path class="cls-1" d="M37.27,50.08v-15c0-6.64,10.32-6.66,10.32,0v15c0,6.64-10.32,6.66-10.32,0Z"/>
    //         </svg>
    //     )
    // }
    // else{
    //     return(
    //         <svg style={style}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.59 55.07">
    //             <path class="cls-1" d="M0,50.08V5C0-1.66,10.32-1.67,10.32,5v45.1c0,6.64-10.32,6.66-10.32,0Z"/>
    //             <path class="cls-1" d="M18.64,42.55v-30c0-6.64,10.32-6.65,10.32,0v30c0,6.64-10.32,6.65-10.32,0Z"/>
    //             <path class="cls-1" d="M37.27,35V20c0-6.65,10.32-6.66,10.32,0V35c0,6.64-10.32,6.65-10.32,0Z"/>
    //         </svg>
    //     )
    // }
    
    style = {...style, transform:'rotate(90deg)'}
    return graph9(style)
    
    
}

export default GraphIcon;