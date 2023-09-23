export enum Status {
    New = "New",
    Working = "Working",
    Done = "Done"
}

export default interface TaskDto {
    name: string;
    description: string;
    status: Status;
}