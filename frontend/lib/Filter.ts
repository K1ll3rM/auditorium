export class Filter {
    values: string[] = [];
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    addValue(value: string) {
        if (!this.values.includes(value)) {
            this.values.push(value);
        }
    }
}

export interface FiltersInterface {
    [key: string]: Filter;
}

export interface FiltersSelectedInterface {
    [key: string]: string;
}
