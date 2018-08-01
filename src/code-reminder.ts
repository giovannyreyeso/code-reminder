import * as vscode from 'vscode';

export function reminder(listCommands: string[]) {
    let activeEditor = vscode.window.activeTextEditor;
    vscode.window.showQuickPick(listCommands).then((value) => {
        if (value !== undefined) {
            replaceText(activeEditor, value);
        }
    });
}
function replaceText(activeEditor: any, text: string) {
    if (activeEditor !== undefined) {
        const position = activeEditor.selection.active;
        const selection = activeEditor.selection;
        activeEditor.edit((e: any) => {
            e.delete(selection);
            e.replace(position, text);
        });
    }
}