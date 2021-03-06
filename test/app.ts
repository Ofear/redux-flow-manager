import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import CreateFlowManagerAPI, { flowManagerReducer } from '../src';
import { conditionExampleTemplate } from './conditions';

const createApp = (withConditionsLogs = false, singleApp = true): any => {
	/** * Conditions Promises ** */
	const conditionA = conditionExampleTemplate(true, 'conditionA', withConditionsLogs);
	const conditionB = conditionExampleTemplate(false, 'conditionB', withConditionsLogs);
	const conditionC = conditionExampleTemplate(false, 'conditionC', withConditionsLogs);
	const conditionD = conditionExampleTemplate(true, 'conditionD', withConditionsLogs);

	/** * Flows Config ** */
	const flowsConfig = [
		{
			flowName: 'planOnlyFlow',
			conditions: [
				{
					conditionName: 'conditionA',
					onCheck: conditionA
				},
				{
					conditionName: 'conditionB',
					onCheck: conditionB,
					mandatory: false
				}
			]
		},
		{
			flowName: 'onlyAccessoryFlow',
			runInFlowTypes: ['COP'],
			conditions: [
				{
					conditionName: 'conditionC',
					onCheck: conditionC
				},
				{
					conditionName: 'conditionD',
					onCheck: conditionD
				}
			]
		},
		{
			flowName: 'changePlanFlow',
			runInFlowTypes: ['CHQ'],
			conditions: [
				{
					conditionName: 'conditionA',
					onCheck: conditionA
				},
				{
					conditionName: 'conditionD',
					onCheck: conditionD
				}
			]
		}
	];

	const stepsConfig = {
		COP: {
			onlyAccessoryFlow: {
				steps: [
					'STEP_A',
					'STEP_B',
					'STEP_C',
				]
			}
		},
		CHQ: {
			'planOnlyFlow,changePlanFlow': {
				steps: [
					'STEP_R',
					'STEP_T',
					'STEP_X',
				]
			},
			planOnlyFlow: {
				steps: [
					'STEP_B',
					'STEP_C',
					'STEP_D',
				]
			},
			changePlanFlow: {
				steps: [
					'STEP_A',
					'STEP_D',
					'STEP_E',
				]
			}
		}
	};

	/** * Create Store ** */
	const rootReducer = combineReducers({
		flowManager: flowManagerReducer
	});

	const store = createStore(rootReducer, devToolsEnhancer({}));

	if (singleApp) {
		return CreateFlowManagerAPI(store, 'flowManager', flowsConfig, stepsConfig)
	}

	const flowManagerApi_1 = CreateFlowManagerAPI(store, 'flowManager', flowsConfig, stepsConfig, 'test_1');
	const flowManagerApi_2 = CreateFlowManagerAPI(store, 'flowManager', flowsConfig, stepsConfig, 'test_2');

	return {
		flowManagerApi_1,
		flowManagerApi_2
	}
};

export default createApp;
