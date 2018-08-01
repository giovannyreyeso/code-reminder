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

    let next = vscode.commands.registerCommand('code-reminder.execute', () => {
        if (!isValidConf(codeReminderConf)) {
            return;
        }
        const len = codeReminderConf.reminder.length;
        position = (position + 1)%len;
        codeReminder.reminder(codeReminderConf.reminder[position]);
    });

    let back = vscode.commands.registerCommand('code-reminder.execute-back', () => {
        if (!isValidConf(codeReminderConf)) {
            return;
        }
        const len = codeReminderConf.reminder.length;
        position = (position - 1 + len)%len;
        codeReminder.reminder(codeReminderConf.reminder[position]);
    });

    context.subscriptions.push(next);
    context.subscriptions.push(back);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function isValidConf(codeReminderConf: any) {
    if (codeReminderConf.reminder === undefined) {
        utils.showMessage(utils.MessageType.ERROR, "You need first add Preferences/Settings");
        return false;
    }
    if (vscode.window.activeTextEditor === undefined) {
        utils.showMessage(utils.MessageType.ERROR, "You need first open a new document");
        return false;
    }
    return true;
}