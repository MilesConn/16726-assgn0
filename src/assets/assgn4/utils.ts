interface OptimizationData {
    run: number;
    styleLoss: number;
    contentLoss: number;
}

export function getMinLoss(data: string, lossType: 'style' | 'content'): number {
    const lines = data.split('\n');
    const optimizationData: OptimizationData[] = [];

    lines.forEach((line) => {
        const runMatch = line.match(/run \[(\d+)\]:/);
        const styleLossMatch = line.match(/Style Loss : (\d+\.\d+)/);
        const contentLossMatch = line.match(/Content Loss: (\d+\.\d+)/);
        // console.log("RUN MATHC: ", runMatch)
        // console.log("Style loss match: ", styleLossMatch)
        // console.log("Conetnet match: ", contentLossMatch)

        if (styleLossMatch) {
            // const run = parseInt(runMatch[1], 10);
            const styleLoss = styleLossMatch ? parseFloat(styleLossMatch[1]) : 0;
            if (styleLossMatch && styleLossMatch[1]) {
                console.log("STLYE LOSS: ", styleLossMatch[1])
            }
            const contentLoss = contentLossMatch ? parseFloat(contentLossMatch[1]) : 0;

            optimizationData.push({ run: 50, styleLoss, contentLoss: 0 });
        }
    });

    // if (optimizationData.length === 0) {
    //     throw new Error('No optimization data found.');
    // }

    console.log(optimizationData);

    const minLoss = optimizationData.reduce((min, data) => {
        const loss = lossType === 'style' ? data.styleLoss : data.contentLoss;
        return loss < min ? loss : min;
    }, Infinity);

    optimizationData.sort((a, b) => a.styleLoss - b.styleLoss)

    console.log(optimizationData)

    return minLoss;
}

interface ExperimentData {
    contentName: string;
    styleName: string;
    iteration: number;
    source: string;
    filePath: string;
}

function parseExperimentData(filePaths: string[]): ExperimentData[] {
    const experimentData: ExperimentData[] = [];

    for (const filePath of filePaths) {
        const match = filePath.match(/histogram1_(.+)_(.+)_(\d+)_(.+)\.jpeg/);
        if (match) {
            const [_, contentName, styleName, iteration, source] = match;
            experimentData.push({
                contentName,
                styleName,
                iteration: parseInt(iteration),
                source,
                filePath,
            });
        }
    }

    return experimentData;
}

function createExperimentMatrix(
    experimentData: ExperimentData[],
    xAxisAttribute: keyof ExperimentData,
    yAxisAttribute: keyof ExperimentData
): Record<string, Record<string, ExperimentData[]>> {
    const matrix: Record<string, Record<string, ExperimentData[]>> = {};

    for (const data of experimentData) {
        const xAxisValue = data[xAxisAttribute];
        const yAxisValue = data[yAxisAttribute];

        if (!matrix[xAxisValue]) {
            matrix[xAxisValue] = {};
        }
        if (!matrix[xAxisValue][yAxisValue]) {
            matrix[xAxisValue][yAxisValue] = [];
        }

        matrix[xAxisValue][yAxisValue].push(data);
    }

    return matrix;
}

export function fuzzyFind(a: [string, any][], criteria: RegExp | string): any | undefined {
    let t: RegExp;
    if (criteria instanceof String || typeof criteria === "string") {
        t = new RegExp(criteria as string);
    } else {
        t = criteria;
    }
    const temp = a.find(([v, _]) => {
        return t.test(v)
    });
    if (temp) {
        return temp[1];
    }
    return temp;
}