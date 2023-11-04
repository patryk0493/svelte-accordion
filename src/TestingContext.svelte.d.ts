import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        Component: any;
        contextKey: string;
        contextValue: any;
        testedComponentProps: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TestingContextProps = typeof __propDef.props;
export type TestingContextEvents = typeof __propDef.events;
export type TestingContextSlots = typeof __propDef.slots;
export default class TestingContext extends SvelteComponent<TestingContextProps, TestingContextEvents, TestingContextSlots> {
}
export {};
