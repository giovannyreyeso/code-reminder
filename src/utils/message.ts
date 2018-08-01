import * as vscode from 'vscode';

export enum MessageType {
    ERROR = "ERROR",
    INFORMATION = "INFORMATION"
}

export function showMessage(type: MessageType, message: string) {
    switch (type) {
        case MessageType.INFORMATION:
            vscode.window.showInformationMessage(message);
            break;
        case MessageType.ERROR:
            vscode.window.showErrorMessage(message);
        default:
            vscode.window.showInformationMessage(message);
            break;
    }
}
