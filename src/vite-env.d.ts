/// <reference types="vite-plugin-svgr/client" />
import React from 'react';

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
