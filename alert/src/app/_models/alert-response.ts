export class AlertResponse<T> {
    code: number;
    message: string;
    timestamp: string;
    path: string;
    numberOfAlerts: number;
    alerts: T;
    alert: T;
}
