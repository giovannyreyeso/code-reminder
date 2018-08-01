import * as vscode from 'vscode';

export function reminder(codeReminderText: string) {
    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor != undefined) {
        const position = activeEditor.selection.active;
        const selection = activeEditor.selection;
        activeEditor.edit(e => {
            e.delete(selection);
            e.replace(position, codeReminderText);
        });
    }
}