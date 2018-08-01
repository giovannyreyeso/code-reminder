'use strict';
import * as vscode from 'vscode';
import * as utils from './utils/message';
import * as codeReminder from './code-reminder';

export function activate(context: vscode.ExtensionContext) {
    let position = 0;
    let codeReminderConf = vscode.workspace.getConfiguration("code-reminder");
    vscode.workspace.onDidChangeConfiguration(() => {
        codeReminderConf = vscode.workspace.getConfiguration("code-reminder");
    });
    let disposable = vscode.commands.registerCommand('code-reminder.execute', () => {
        if (codeReminderConf.reminder == undefined) {
            utils.showMessage(utils.MessageType.ERROR, "You need first add Preferences/Settings");
            return;
        }
        if (vscode.window.activeTextEditor == undefined) {
            utils.showMessage(utils.MessageType.ERROR, "You need first open a new document");
            return;
        }
        if (position < 0) {
            position = 0;
        }
        if (position > codeReminderConf.reminder.length) {
            position = 0;
        }
        codeReminder.reminder(codeReminderConf.reminder[position]);
        position++;
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}