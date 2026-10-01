import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTodoMessage(completed: number, total: number) {
    if (total === 0) {
        const messages = [
            "Nothing to do yet. Enjoy the suspicious peace.",
            "No tasks. The productivity gods are confused.",
            "Your task list is emptier than your motivation on a Monday.",
            "A blank slate. Try not to immediately ruin it.",
            "No tasks detected. Humanity survives another day.",
            "Absolutely nothing pending. Suspicious.",
          "The list is empty. For once, you are ahead of schedule.",
            
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    const percentage = Math.round((completed / total) * 100)

    if (percentage === 0) {
        const messages = [
            "Not a single task down. The list remains undefeated.",
            "Zero completed. The tasks are getting comfortable.",
            "A bold strategy: completing absolutely nothing.",
            "The productivity meter is currently taking a nap.",
            "The tasks have assembled. You have not.",
            "0% complete. There's nowhere to go but up.",
            "The task list is winning this round.",
            "An untouched battlefield. Make your move.",
            "The procrastination department is thriving.",
          "Your tasks are beginning to wonder if you'll ever return.",
            "Not one? Really?",
"I expected better. The tasks did not.",
"Interesting. You opened the app and did nothing.",
"Impressive commitment to doing absolutely nothing.",
"Zero. The number is doing a lot of talking.",
"The tasks are disappointed. I'm disappointed. Mostly the tasks.",
"You had one job. Technically, several jobs.",
"Still at zero. Bold choice.",
"Not even one task? Fascinating.",
"The checklist remains untouched. It has noticed.",
"I see we're choosing denial today.",
"Your tasks have been waiting patiently. They are running out of patience.",
"Nothing completed. A remarkable lack of progress.",
"At this rate, the tasks will finish themselves.",
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    if (percentage < 25) {
        const messages = [
            "A start is a start. Keep going.",
            "You've made a dent. A tiny, respectable dent.",
            "The list is beginning to crack.",
            "Progress detected. Scientists are investigating.",
            "One step down. Several suspiciously remain.",
            "The tasks have suffered their first casualty.",
            "You're moving. Slowly, but legally.",
            "The productivity engine has finally started.",
            "Not much, but it's something.",
            "The list isn't going to defeat itself.",
            "A modest beginning. Don't waste it.",
          "You've broken the seal. Keep going.",
          "That's it? I know you can do better.",
"One or two tasks and suddenly we're calling it progress.",
"You completed a few. The rest are still staring at you.",
"Technically progress. Emotionally questionable.",
"You're getting there. Eventually.",
"That's a respectable start. Now stop celebrating.",
"A few down. An alarming number remain.",
"Good. Now do another one.",
"Progress has occurred. Don't let it go to your head.",
"You've done some work. Some.",
"The list has noticed your effort. Barely.",
"At least you're not at zero anymore.",
"You're making progress, but the task list isn't impressed yet.",
"One small victory. There are others waiting.",
"Decent start. Now keep going before the momentum disappears.",
              
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    if (percentage < 50) {
        const messages = [
            "You're making progress. Keep the momentum.",
            "The task list is starting to look nervous.",
            "Not bad. We're getting somewhere.",
            "You're officially making a dent.",
            "The balance of power is shifting.",
            "Halfway is getting suspiciously close.",
            "The list is losing ground.",
            "You're doing better than your past self.",
            "Progress is progress. Even the boring kind.",
            "The productivity machine is warming up.",
            "Things are moving in the correct direction.",
          "You're getting there. Keep pushing.",
            "You're getting somewhere. Don't slow down now.",
"Okay, now I'm paying attention.",
"Not bad. Let's see if you can finish.",
"You're halfway toward being impressive.",
"The remaining tasks are laughing less now.",
"You're making the list nervous.",
"Keep going. You've got something to prove.",
"You're doing alright. Don't ruin it.",
"Now we're getting serious.",
"You're officially too far in to quit.",
"The task list has entered defensive mode.",
"You're winning, but don't get comfortable.",
"Keep that energy. The rest aren't going to disappear.",
"You're making progress faster than your excuses.",
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    if (percentage < 75) {
        const messages = [
            "Now we're cooking.",
            "More done than not. The tasks should be worried.",
            "You're winning this battle.",
            "The finish line is getting closer.",
            "Look at that progress.",
            "The task list is officially losing.",
            "You're past the halfway point. Keep going.",
            "Momentum acquired.",
            "The remaining tasks are looking increasingly lonely.",
            "You're doing some serious damage to that list.",
            "The hard part is mostly behind you.",
            "We're entering the 'actually productive' zone.",
            "The list is shrinking nicely.",
          "You've got this thing under control.",
            "Now that's more like it.",
"Okay. I respect the progress.",
"You're actually cooking now.",
"The task list is starting to panic.",
"Look at you, getting things done.",
"You're making this look almost intentional.",
"That's some respectable productivity.",
"You're dangerously close to being organized.",
"The remaining tasks are getting nervous.",
"You're on a roll. Don't trip.",
"At this point, finishing is probably easier than quitting.",
"You're doing suspiciously well.",
"The checklist is losing the psychological battle.",
"Momentum looks good on you.",
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    if (percentage < 100) {
        const messages = [
            "Almost there. Finish the job.",
            "The finish line is right there.",
            "You've nearly conquered the list.",
            "Just a few more.",
            "Don't let the last ones escape.",
            "Victory is dangerously close.",
            "The remaining tasks are outnumbered.",
            "You're in the endgame now.",
            "So close. Don't fumble it.",
            "The task list is hanging by a thread.",
            "A little more and you're done.",
            "You've practically won.",
            "The last few are just cleaning up.",
            "Finish what you started.",
          "The remaining tasks are officially on notice.",
            "You're right there. Finish it.",
"Seriously? You're going to stop now?",
"One last push.",
"Don't leave the poor remaining tasks hanging.",
"You've come this far. Finish the thing.",
"Almost done. No dramatic exits.",
"The last few are begging for attention.",
"You're one good decision away from 100%.",
"Finish it. I know you're looking at it.",
"So close it hurts.",
"You're basically done. Make it official.",
"The final tasks are surviving on borrowed time.",
"Do not fumble the ending.",
"Finish the list and claim your tiny victory.",
        ]

        return messages[Math.floor(Math.random() * messages.length)]
    }

    const messages = [
        "Everything is done. You absolute menace.",
        "100%. Nothing left standing.",
        "Task list: defeated.",
        "Clean slate.",
        "Everything is complete. What are you going to do now?",
        "Perfect score. The tasks never stood a chance.",
        "Zero tasks remaining. Suspiciously efficient.",
        "The list has been annihilated.",
        "Nothing left to complete. Beautiful.",
        "You actually finished everything.",
        "The task list has ceased to exist.",
        "All tasks completed. Productivity has peaked.",
        "Everything's done. Go touch some grass.",
        "Mission accomplished.",
        "The board is clean.",
        "No unfinished business.",
        "You have defeated the checklist.",
        "100%. The spreadsheet gods approve.",
        "Everything is handled.",
        "The tasks have been dealt with.",
    ]

    return messages[Math.floor(Math.random() * messages.length)]
}
