export type SubFlowsConfig = Array<SubFlow>;

export interface SubFlowMachineContext {
	currentFlowToCheck: string;
	subFlowTypes: Array<string>;
	error: boolean;
}

export interface SubFlow {
	flowName: string;
	runInFlowTypes?: Array<string>;
	conditions: Array<Condition>;
}

export interface Condition {
	conditionName: string;
	onCheck: Function;
	mandatory?: boolean;
}
