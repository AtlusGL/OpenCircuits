import "jest";

import {DigitalCircuitDesigner} from "digital/models/DigitalCircuitDesigner";
import {XORGate} from "digital/models/ioobjects/gates/XORGate";

import {GetHelpers} from "test/helpers/Helpers";


describe("XORGate", () => {
    describe("XORGate", () => {
        const designer = new DigitalCircuitDesigner(0);
        const {AutoPlace} = GetHelpers({designer});

        const [g, [a, b], [o]] = AutoPlace(new XORGate());

        test("Initial State", () => {
            expect(o.isOn()).toBe(false);
        });
        test("Input A and B Off", () => {
            a.activate(false);
            b.activate(false);

            expect(o.isOn()).toBe(false);
        });
        test("Input A On", () => {
            a.activate(true);
            b.activate(false);

            expect(o.isOn()).toBe(true);
        });
        test("Input B On", () => {
            a.activate(false);
            b.activate(true);

            expect(o.isOn()).toBe(true);
        });
        test("Input A and B On", () => {
            a.activate(true);
            b.activate(true);

            expect(o.isOn()).toBe(false);
        });
    });
    describe("XNORGate", () => {
        const designer = new DigitalCircuitDesigner(0);
        const {AutoPlace} = GetHelpers({designer});

        const [g, [a, b], [o]] = AutoPlace(new XORGate(true));

        test("Initial State", () => {
            expect(o.isOn()).toBe(true);
        });
        test("Input A and B Off", () => {
            a.activate(false);
            b.activate(false);

            expect(o.isOn()).toBe(true);
        });
        test("Input A On", () => {
            a.activate(true);
            b.activate(false);

            expect(o.isOn()).toBe(false);
        });
        test("Input B On", () => {
            a.activate(false);
            b.activate(true);

            expect(o.isOn()).toBe(false);
        });
        test("Input A and B On", () => {
            a.activate(true);
            b.activate(true);

            expect(o.isOn()).toBe(true);
        });
    });
});
