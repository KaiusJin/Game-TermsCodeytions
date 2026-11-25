import type { LevelMeta } from '../game/types';

/**
 * Copy for all 80 agreements. Each playthrough draws 15 of them (see game/run.ts).
 * `answer` is only ever rendered in the hidden answer drawer.
 */
export const levelCopy = {
  // ── Tier 1 · warm-ups ────────────────────────────────────────────────────
  'plain-agree': {
    tier: 1, title: 'The easy part',
    terms: [
      "Welcome to Terms & Codeytions, a binding* agreement between you (“the User”) and Codey, the CSC’s official Shiba Inu (“the Dog”).",
      "This first agreement contains no tricks, traps, or hidden clauses. Codey has been specifically told to behave. Enjoy it while it lasts.",
      "* Not binding.",
    ],
    codey: 'Enjoy this one. It won’t last.',
    hints: ["Not every agreement is out to get you.", 'Click the blue Agree button.'],
    answer: 'Click the blue Agree button.',
  },
  'opposite-day': {
    tier: 1, title: 'Opposite day',
    terms: [
      "This agreement was drafted on Opposite Day, the most sacred holiday on the CSC calendar.",
      "In observance of the holiday, every button in this document shall mean the exact opposite of what it says.",
      "Codey sincerely hopes you do not have a wonderful Opposite Day.",
    ],
    codey: 'Woof means meow today.',
    hints: ["Holidays should be taken seriously. Especially this one.", 'Click the button labelled “Disagree”.'],
    answer: 'Click “Disagree”. (“Agree” fails.)',
  },
  'read-the-room': {
    tier: 1, title: 'Read the room',
    terms: [
      "Codey has had a long week and would like to feel heard.",
      "Accordingly, before agreeing, the User shall express their disagreement exactly twice. No more, no less. Three times is just mean.",
      "Once Codey feels heard, agreement may proceed as normal.",
    ],
    codey: 'I just want to be listened to.',
    hints: ["Codey just wants a little attention first. How much, exactly?", 'Press Disagree twice, then Agree.'],
    answer: 'Press Disagree exactly twice, then click Agree.',
  },
  'needle': {
    tier: 1, title: 'A needle in the no’s',
    terms: [
      "To keep things fair, our legal department has produced several dozen alternative buttons.",
      "Only one of them is spelled correctly. The rest were typed by lawyers during finals season.",
      "Pressing a misspelled button constitutes a typo, and typos are legally binding.",
    ],
    codey: 'Spelling counts. I checked.',
    hints: ["Lawyers are terrible spellers. Be a better one.", 'It is in row 5, column 4.'],
    answer: 'Row 5, column 4 (the 28th button) is the real “Agree”.',
  },
  'plain-sight': {
    tier: 1, title: 'In plain sight',
    terms: [
      "The large button below was installed by our design team for aesthetic purposes and is not connected to anything.",
      "Real consent is expressed in words, not buttons. Please read the agreement carefully — every word in it means what it says.",
      "Codey has nothing further to add, but wags approvingly.",
    ],
    codey: 'Decorations are for looking, not clicking.',
    hints: ["Decorations are for looking at. Words are for something else.", 'Click the word “agree” in the clause inside the document.'],
    answer: 'Click the word “agree” inside the paragraph. The big button fails.',
  },
  'hold-agree': {
    tier: 1, title: 'Hold that thought',
    terms: [
      "Codey believes all good things take time: naps, sourdough, and agreements.",
      "Agreements entered into in under one second shall be treated as impulse purchases and refunded automatically.",
      "Please take a moment before committing. Then take a little longer. Codey will wait.",
    ],
    codey: 'Commitment! I love commitment.',
    hints: ["Codey isn’t in a hurry. Why are you?", 'Press and hold Agree until the bar fills (about 1.5 s). Space/Enter can be held too.'],
    answer: 'Press and hold Agree for ~1.5 s until it fills.',
  },
  'box-ticking': {
    tier: 1, title: 'Box-ticking exercise',
    terms: [
      "Before proceeding, please tick every box marked as required.",
      "Optional boxes are entirely optional. To save you time, some optional boxes have already been ticked on your behalf, because we care.",
      "Codey reminds you that you are always free to untick anything you did not personally tick.",
    ],
    codey: 'I would never pre-tick a box. Never.',
    hints: ["Who ticked that box? It wasn’t you.", 'Tick the three required boxes and untick the newsletter.'],
    answer: 'Tick “read”, “actually read” and “not a goose”; untick the pre-ticked newsletter; then Agree.',
  },
  'runaway': {
    tier: 1, title: 'Commitment issues',
    terms: [
      "The Agree button has commitment issues. It is working on them with a licensed therapist.",
      "It may back away when approached. This is normal and should not be taken personally.",
      "Like all of us, however, it can only run as far as the edges of its world.",
    ],
    codey: 'Give it space. Or don’t.',
    hints: ["Everyone runs out of room eventually.", 'Chase it into a corner, then click. Tab + Enter also works.'],
    answer: 'Push it into a corner of the box (it can’t escape), then click. Or Tab to it and press Enter.',
  },
  'bilingual': {
    tier: 1, title: 'Bilingual by law',
    terms: [
      "Pursuant to the Official Languages Act (probably), this agreement is offered in both English and French.",
      "The English version is currently awaiting review by a co-op student and shall not be legally binding until next term.",
      "La version française, en revanche, est parfaitement valide.",
    ],
    codey: 'Ouaf ! (That’s “woof”.)',
    hints: ["Which version did the intern not have to review?", 'Click “J’accepte”.'],
    answer: 'Click “J’accepte”. English “Agree” fails.',
  },
  'fine-print': {
    tier: 1, title: 'The fine print',
    terms: [
      "In accordance with the Button Size Reduction Act, the official Agree button has been reduced to the smallest size legally permissible.",
      "Larger buttons may appear in this document for decorative purposes only.",
      "Codey recommends reading every agreement to the very last character.",
    ],
    codey: 'I need my glasses for this one.',
    hints: ["Codey’s advice in §3 is worth taking literally.", 'The tiny blue dot after the last sentence is the button.'],
    answer: 'Click the tiny blue dot at the end of the last line of fine print. The big button fails.',
  },

  // ── Tier 2 · tricks ─────────────────────────────────────────────────────
  'invisible': {
    tier: 2, title: 'Now you see it',
    terms: [
      "In pursuit of a cleaner aesthetic, our design team has removed everything unnecessary from this page.",
      "The design team considered the Agree button unnecessary. Legal disagreed, so the button is still there. It just no longer looks like anything.",
      "Users are encouraged to explore. Blank space is shy, not empty.",
    ],
    codey: 'Very sleek. Very invisible.',
    hints: ["Blank space is shy, not empty. Go say hello.", 'It is in the lower-right area of the blank box.'],
    answer: 'Hover the lower-right part of the empty box to reveal and click Agree.',
  },
  'out-of-the-way': {
    tier: 2, title: 'Out of the way',
    terms: [
      "For your convenience, we have pre-selected Disagree on your behalf.",
      "The Disagree card has been placed exactly where you were about to click. You’re welcome.",
      "Pressing Disagree is final. Moving it, however, is merely rearranging the furniture.",
    ],
    codey: 'Rude of it, honestly.',
    hints: ["Furniture can be moved. Furniture can also be stood on. Choose wisely.", 'Drag the Disagree card aside, then click Agree underneath.'],
    answer: 'Drag the Disagree card away (don’t click it), then click Agree.',
  },
  'are-you-sure': {
    tier: 2, title: 'Are you sure?',
    terms: [
      "To protect you from accidental agreement, a short series of confirmation questions will follow.",
      "Each question is written by a different intern. Please read every one of them carefully.",
      "Muscle memory is not recognized as consent under this agreement.",
    ],
    codey: 'Are you sure you’re sure?',
    hints: ["Muscle memory is not consent. Read before you nod.", 'Yes, Yes, Yes, then “No” to “Do you want to cancel?”'],
    answer: 'Agree → Yes → Yes → Yes → “No” (don’t cancel). The buttons swap places each step.',
  },
  'backwards': {
    tier: 2, title: 'Sign backwards',
    terms: [
      "Please sign below by writing the words “I agree”.",
      "The signature field was installed by a first-year intern who learned to write from right to left. Nobody has had the heart to tell them.",
      "Your signature is valid only if it reads correctly on the page.",
    ],
    codey: 'eerga I. Wait.',
    hints: ["How would the intern write it?", 'Type “eerga I” so it reads “I agree”.'],
    answer: 'Type “eerga I” (so it displays “I agree”), then click Agree.',
  },
  'endless-scroll': {
    tier: 2, title: 'The endless scroll',
    terms: [
      "Please scroll to the bottom of these terms to locate the Agree button.",
      "These terms are generated on demand and are, as far as our engineers can tell, infinite.",
      "In accordance with accessibility guidelines, a shortcut has been provided for the truly impatient. It is very small and lives near the top.",
    ],
    codey: 'I stopped scrolling in 2019.',
    hints: ["The impatient never reach the bottom. They skip it.", 'Clause 1 has an accessibility link: “skip to signature”.'],
    answer: 'Click “skip to signature” inside clause 1, then Agree.',
  },
  'please-wait': {
    tier: 2, title: 'Please wait',
    terms: [
      "Our servers are powered by one very tired hamster named Gerald.",
      "Gerald works at his own pace. Interrupting Gerald while he is working causes him to drop everything and go home.",
      "Gerald will let you know when he is done. Gerald appreciates your patience.",
    ],
    codey: 'Patience is a virtue. And a requirement.',
    hints: ["Gerald does not like being rushed.", 'Click Agree once, wait until it finishes, then click the confirm button.'],
    answer: 'Click Agree once, wait ~3 s without clicking, then click “Confirm Agree”.',
  },
  'goose-captcha': {
    tier: 2, title: 'Definitely not a robot',
    terms: [
      "To prevent automated agreements, please verify that you are human.",
      "Canada geese are not considered human, regardless of what they tell you. Neither are ducks. Codey’s status is under review.",
      "Select every square containing a Canada goose, and nothing else.",
    ],
    codey: 'I’m in there. I’m not a goose.',
    hints: ["Not every bird is a goose. Not every dog is a bird.", 'Select top-left, centre, middle-right and bottom-middle, then Verify.'],
    answer: 'Select the 4 geese: top-left, centre, middle-right, bottom-middle → Verify → Agree.',
  },
  'green-light': {
    tier: 2, title: 'Green means agree',
    terms: [
      "This agreement is located at a busy intersection on Ring Road.",
      "Agreements may only proceed on a green signal. Agreements entered into on yellow or red will be ticketed by the Special Constable Service.",
    ],
    codey: 'Pedestrians first.',
    hints: ["Mind the traffic laws on Ring Road.", 'Click Agree only while the light is green.'],
    answer: 'Wait for the green light, then click Agree.',
  },
  'highlight': {
    tier: 2, title: 'Highlight of my day',
    terms: [
      "To reduce printing costs, the Agree link has been printed in invisible ink.",
      "Invisible ink only reveals itself to diligent readers — the kind who highlight every line of their textbooks.",
      "The blank space below this clause is not blank.",
    ],
    codey: 'Select all the things!',
    hints: ["Diligent readers have a habit. Try it on the blank bit.", 'Drag-select the blank line (or Ctrl/⌘+A) and click the revealed “agree”.'],
    answer: 'Select the blank gap between the clauses (or Ctrl/⌘+A) to reveal the hidden link, then click it.',
  },
  'breaking-news': {
    tier: 2, title: 'Breaking news',
    terms: [
      "Breaking: your Agree button is currently live on the CSC News Network.",
      "Our ticker moves quickly to keep you informed. Anchors report that the news stops for anyone who leans in close enough.",
    ],
    codey: 'This just in: you should agree.',
    hints: ["News anchors say the ticker slows for anyone who leans in.", 'Hover over (or tap) the ticker to pause it, then click AGREE.'],
    answer: 'Hover the ticker to pause it and click the AGREE item (not DISAGREE).',
  },
  'assembly': {
    tier: 2, title: 'Some assembly required',
    terms: [
      "Your Agree button has been shipped flat-packed to reduce emissions.",
      "Assembly instructions are not included. The finished product is a five-letter word.",
      "Any leftover parts are spare and must not be used. This especially applies to the D, the I, and the S.",
    ],
    codey: 'I have one extra screw. Is that bad?',
    hints: ["Five letters. You already know which word.", 'Tap A, G, R, E, E in order, then press the assembled button.'],
    answer: 'Click tiles A → G → R → E → E to spell AGREE, then click the assembled Agree.',
  },

  // ── Tier 3 · interface puzzles ──────────────────────────────────────────
  'window-shopping': {
    tier: 3, title: 'Window shopping',
    terms: [
      "Several important notices have been placed over this agreement for your benefit.",
      "Most notices may be dismissed at your leisure. One of them is load-bearing and must never be closed under any circumstances.",
      "Load-bearing windows may, however, be moved by their title bars.",
    ],
    codey: 'Pop-ups are a lifestyle.',
    hints: ["Some windows close. Some windows move. One must never close.", 'Close every pop-up except “DO NOT CLOSE” — drag that one aside by its title bar.'],
    answer: 'Close the pop-ups with ×, but DRAG the “DO NOT CLOSE” window away (closing it fails). Then Agree.',
  },
  'stack-pop': {
    tier: 3, title: 'Stack overflow',
    terms: [
      "All agreements at the CSC are processed on a strict last-in, first-out basis.",
      "Your agreement was the very first to arrive, which unfortunately places it at the bottom of the pile.",
      "Clearing the pile will also clear your agreement. Adding more to the pile will not help either.",
    ],
    codey: 'LIFO is life.',
    hints: ["Last in, first out. Your agreement was first in.", 'Press pop() until Agree is on top. Don’t clear() or push().'],
    answer: 'Press pop() five times, then click Agree. clear() fails; push() adds more junk.',
  },
  'merge-conflict': {
    tier: 3, title: 'Merge conflict',
    terms: [
      "You and Codey both edited consent.ts at the same time. Git is upset.",
      "Your version says one thing. Codey’s incoming version says another. As always, Codey is right.",
      "Please resolve the conflict and commit your changes before agreeing.",
    ],
    codey: 'I pushed to main. Sorry.',
    hints: ["Who is always right, according to §2?", 'Accept Incoming Change, then Commit.'],
    answer: '“Accept Incoming Change” → “Commit merge” → Agree. Current or Both fail.',
  },
  'sudo': {
    tier: 3, title: 'Permission denied',
    terms: [
      "Agreements are now administered through the CSC terminal.",
      "Regular students do not have permission to agree. Agreement is a privilege reserved for superusers.",
      "If you are lost, the terminal will gladly offer help.",
    ],
    codey: 'With great power comes great agreement.',
    hints: ["Students can’t agree. Who can?", 'Type: sudo agree'],
    answer: 'Type `sudo agree` and press Enter, then click Agree.',
  },
  'compile': {
    tier: 3, title: 'Compile & comply',
    terms: [
      "Your consent is now determined by a small JavaScript function written at 3 a.m. the night before the deadline.",
      "The function contains exactly two typos. Any word in the code may be clicked to try a different spelling.",
      "For the agreement to take effect, the function must return the truth.",
    ],
    codey: 'It works on my machine.',
    hints: ["Read the code out loud. Two words sound wrong.", 'Make it `return true;` (click `fasle` twice, `retrun` once), then Run.'],
    answer: 'Click “fasle” until it says “true”, click “retrun” to fix it, press Run, then Agree.',
  },
  'lights-out': {
    tier: 3, title: 'Lights out',
    terms: [
      "To reduce energy consumption, this agreement is now served in the dark.",
      "A flashlight has been issued to you. It follows your hand wherever it goes.",
      "Codey last saw the Agree button near the floor, on the side of the room Codey holds a pen with. Codey is left-pawed.",
    ],
    codey: 'Who turned off the lights?',
    hints: ["Which paw does Codey write with?", 'Agree is in the lower-left; the other buttons are Disagree.'],
    answer: 'Sweep the flashlight to the lower-left and click Agree (not the Disagrees).',
  },
  'cookies': {
    tier: 3, title: 'Cookie preferences',
    terms: [
      "Before we can show you the terms, we need to talk about cookies.",
      "Accepting all cookies is an agreement to cookies, not to these terms, and shall not count.",
      "Our 412 partners have a legitimate interest in you. Legitimate interest is listed at the very bottom, where nobody ever scrolls.",
    ],
    codey: 'I only accept dog biscuits.',
    hints: ["Nobody ever scrolls to the bottom. Be somebody.", 'Manage → turn off every optional toggle (scroll for “Legitimate interest”) → Save.'],
    answer: 'Manage choices → switch off all optional toggles, including the 3 under “Legitimate interest” → Save → Agree.',
  },
  'typed-consent': {
    tier: 3, title: 'Typed consent',
    terms: [
      "Our mouse has been sent to IT for repairs and is not expected back this term.",
      "Until it returns, all agreements must be entered the old-fashioned way: one letter at a time, ending with a confident Return.",
      "Clicking in the meantime will be considered rude.",
    ],
    codey: 'Clicky clacky.',
    hints: ["The mouse is on vacation. Your keyboard isn’t.", 'Type A-G-R-E-E (or tap the on-screen keys), then press Enter.'],
    answer: 'Type “agree” on the keyboard (or on-screen keys), then press Enter or click the lit button. Clicking early fails.',
  },
  'two-factor': {
    tier: 3, title: 'Two-factor agreement',
    terms: [
      "For your security, a six-digit verification code has been sent to Codey’s phone.",
      "Codey’s phone is somewhere on this desk. It buzzes when it feels ignored.",
    ],
    codey: 'My phone is somewhere around here.',
    hints: ["Something on the desk keeps buzzing.", 'Tap the phone to read the code: 314159.'],
    answer: 'Tap the phone, enter 314159, then Agree.',
  },
  'undo': {
    tier: 3, title: 'Undo',
    terms: [
      "Our records show that you have already clicked Disagree. This decision is final and cannot be undone.",
      "Unless, technically, you go through the Edit menu. But nobody ever looks there.",
    ],
    codey: 'Everybody makes mistakes.',
    hints: ["Codey says nobody ever looks in a certain menu.", 'Edit → Undo Disagree (or Ctrl/⌘+Z), then Agree.'],
    answer: 'Open the Edit menu → “Undo Disagree” (or Ctrl/⌘+Z), then click Agree.',
  },
  'page-five': {
    tier: 3, title: 'Page 5 of 5',
    terms: [
      "The Agree button is located on page 5 of 5.",
      "Access to page 5 requires CSC Premium™ ($49.99/term). Navigation buttons will stop at page 4.",
      "The address bar, however, is a public road and may be used by anyone.",
    ],
    codey: 'Paywalls are ruff.',
    hints: ["The navigation buttons have a paywall. Does the road?", 'Change “page=1” in the address bar to “page=5” and press Enter.'],
    answer: 'Edit the fake URL to …?page=5, press Enter, then Agree.',
  },
  'ask-codey': {
    tier: 3, title: 'Ask Codey',
    terms: [
      "Codey is the CSC’s official mascot, legal advisor, and moral compass.",
      "No agreement shall be made without Codey’s blessing. Always trust Codey. Codey knows what to do.",
      "The large button on this page was installed without consulting Codey and is therefore void.",
    ],
    codey: 'You can just ask me, you know.',
    hints: ["Always trust Codey. Have you asked?", 'Click Codey, then click the sign Codey holds up.'],
    answer: 'Click Codey; they raise an Agree sign — click that sign. The big button fails.',
  },
  'stillness': {
    tier: 3, title: 'Don’t move',
    terms: [
      "Codey is taking a photograph of this agreement for the CSC archives.",
      "Please hold your pose. Any movement — of the mouse, the keyboard, or the page — will blur the photograph and Codey will have to start over.",
      "The Agree button will develop shortly afterwards.",
    ],
    codey: 'Shhh. Freeze.',
    hints: ["Say cheese… and hold it.", 'Don’t touch the mouse or keyboard for 4 seconds, then click Agree.'],
    answer: 'Hold completely still for 4 s (no mouse/keys/scroll), then click Agree.',
  },
  'true-colours': {
    tier: 3, title: 'True colours',
    terms: [
      "In accordance with CSC brand guidelines, only buttons in official CSC blue are legally binding.",
      "Buttons of any other colour will be treated as a polite suggestion and filed accordingly.",
    ],
    codey: 'Blue and white forever.',
    hints: ["What colour is the CSC?", 'Set the hue to around 217° (CSC blue), then Agree.'],
    answer: 'Drag the hue slider to ~217 (blue, 208–226), then click Agree. Wrong colour fails.',
  },
  'recursion': {
    tier: 3, title: 'Recursion',
    terms: [
      "To agree to this agreement, you must first agree to the agreement inside it.",
      "That agreement contains the same clause. So does the one inside that.",
      "Codey assures us this eventually stops. Only the innermost agreement is listening; agreeing to an outer one returns too early.",
    ],
    codey: 'To understand recursion, see: recursion.',
    hints: ["Where is the deepest agreement?", 'Click the innermost Agree each time until the base case (depth 5).'],
    answer: 'Click the innermost Agree 5 times until “base case” appears, then click it. Outer buttons fail.',
  },

  // ── Tier 4 · contraptions ───────────────────────────────────────────────
  'claw': {
    tier: 4, title: 'Claw & order', seconds: 45,
    terms: [
      "Your Agree button has been placed inside the CSC claw machine as a prize.",
      "The machine is on free play, courtesy of Codey. The claw is surprisingly strong, so please make sure it is holding the right prize.",
      "Prizes other than Agree are non-refundable and legally disagreeable.",
    ],
    codey: 'I’ve won three plushies. Lifetime.',
    hints: ["Make sure the claw is holding the right prize.", 'Move right until the claw is above the blue AGREE capsule (≈68%), DROP, then click Agree in the tray.'],
    answer: 'Hold ▶ until the claw sits over the blue AGREE capsule, press DROP, then click Agree in the tray. Grabbing other capsules fails.',
  },
  'goose-guard': {
    tier: 4, title: 'Goose on the loose',
    terms: [
      "A Canada goose has taken up residence on the Agree button.",
      "Under the Ring Road Treaty, geese may not be touched, moved, or argued with.",
      "Geese may, however, be bribed. There is bread left over from the last CSC event.",
    ],
    codey: 'I don’t mess with geese.',
    hints: ["Geese can’t be argued with. They can be bribed.", 'Drag the bread far away; the goose follows it. Then click Agree.'],
    answer: 'Drag the bread to the other side (or use arrow keys on it). The goose follows; click Agree. Clicking the goose fails.',
  },
  'vending': {
    tier: 4, title: 'Vending agreement', seconds: 45,
    terms: [
      "Agreements are now sold in the Math & Computer building vending machine, in slot B3.",
      "All items cost $1.00. The machine accepts quarters and loonies. It is too old to understand toonies.",
      "Please make sure you select the right slot. The machine has a strict no-returns policy.",
    ],
    codey: 'I’d like a B3, please.',
    hints: ["Exact change, then the slot from §1.", 'Insert the loonie ($1.00), key in B3, press OK, then take Agree.'],
    answer: 'Insert $1.00 (loonie, or four quarters), key B → 3 → OK, click Agree in the tray. Wrong code fails.',
  },
  'inspect': {
    tier: 4, title: 'Inspect element',
    terms: [
      "The Agree button on this page has been disabled by the administration.",
      "Ordinary users cannot change this. Developers, however, have tools for exactly this kind of situation.",
      "Developer tools can be found where they always are: up in the toolbar.",
    ],
    codey: 'Hacker voice: I’m in.',
    hints: ["Real developers don’t accept “disabled” as an answer.", 'Open </>, click the `disabled` attribute to delete it, then Agree.'],
    answer: 'Click the </> button, click the `disabled` attribute to remove it, then click Agree.',
  },
  'upside-down': {
    tier: 4, title: 'Upside down',
    terms: [
      "This agreement was printed by our Australian office and arrived upside down.",
      "Signing a document you cannot read is not legally valid, even in Australia.",
      "Our Australian office also installed a knob next to it. Nobody knows why.",
    ],
    codey: 'G’day, mate.',
    hints: ["That knob is there for a reason.", 'Rotate to 0° (upright), then click Agree.'],
    answer: 'Turn the knob (drag or arrow keys) until the document is upright, then Agree. Agreeing while tilted fails.',
  },
  'combination': {
    tier: 4, title: 'Combination clause',
    terms: [
      "The Agree button has been locked in a safe for safekeeping.",
      "Codey could never remember the combination, so Codey hid it in the fine print below, in order.",
    ],
    codey: 'It’s not 1234. I tried.',
    hints: ["Some numbers in the fine print look a little bolder than the rest.", 'The code is 2-0-6.'],
    answer: 'Set the dials to 2-0-6, press Open, then Agree.',
  },
  'scratch': {
    tier: 4, title: 'Scratch & sign',
    terms: [
      "Your agreement has been printed on a scratch-off card.",
      "Only one panel is a winner. Clicking a losing panel is legally equivalent to disagreeing.",
      "Codey always saves the best for last.",
    ],
    codey: 'Scratch gently. Like a belly rub.',
    hints: ["Codey always saves the best for last.", 'Scratch the right-hand panel and click Agree.'],
    answer: 'Scratch the third (right) panel and click Agree. Clicking a revealed Disagree fails.',
  },
  'codey-says': {
    tier: 4, title: 'Codey says',
    terms: [
      "In this agreement, only Codey’s orders are legally binding.",
      "Orders that do not begin with “Codey says” were issued by an impostor and must be ignored.",
      "Obeying an impostor will void this agreement immediately.",
    ],
    codey: 'Codey says: read this.',
    hints: ["Who are you supposed to listen to?", 'Wait for “Codey says: click Agree”, then click Agree.'],
    answer: 'Do nothing until the sign reads “Codey says: click Agree”, then click Agree.',
  },
  'exam': {
    tier: 4, title: 'Self-referential exam',
    terms: [
      "To agree, you must first pass the final exam for CS 135: Designing Functional Agreements.",
      "The exam has one question and exactly one correct answer. Calculators are not permitted. Logic is strongly encouraged.",
    ],
    codey: 'This is worth 100% of your grade.',
    hints: ["Assume one answer is right and follow where it leads.", 'A, B and C form a loop, so the answer is D.'],
    answer: 'Choose D, then Agree. A/B/C are a contradiction loop.',
  },

  // ── Tier 5 · boss levels ────────────────────────────────────────────────
  'mirror-cursor': {
    tier: 5, title: 'The other way round',
    terms: [
      "This agreement is being displayed through a mirror, for reasons our IT department is still investigating.",
      "Your cursor has been reflected through the centre of the page. Everything you do happens on the opposite side.",
      "What you see is not where you click.",
    ],
    codey: 'Left is the new right.',
    hints: ["What you see is not where you click. Reflect on that.", 'Agree is top-left, so put your real pointer bottom-right and click.'],
    answer: 'Move your real pointer to the bottom-right until the blue cursor is on Agree (top-left), then click. Arrow keys + Enter also work.',
  },
  'pipes': {
    tier: 5, title: 'Connect the dots', seconds: 50,
    terms: [
      "The Agree button lost power during a campus-wide outage.",
      "Power may be restored by reconnecting the plumbing between the generator and the button. Each pipe turns when tapped.",
      "Plant Operations apologizes for running electricity through pipes.",
    ],
    codey: 'Have you tried turning it off and on?',
    hints: ["Follow the power from the lightning bolt.", 'Route: R1C1 ─, R1C2 ┐, R2C2 │, R3C2 └, R3C3 ─, R3C4 ─.'],
    answer: 'Row1 col1 ─, row1 col2 ┐, row2 col2 │, row3 col2 └, row3 col3 ─, row3 col4 ─. Then Agree.',
  },
  'defuse': {
    tier: 5, title: 'The final countdown',
    terms: [
      "This agreement is protected by a small explosive device. Please do not panic.",
      "Wire protocol: if a gold wire exists, cut it first. Never cut red. The black wire is always cut last. Blue is decorative.",
      "Codey has cut many wires in their career and still has all four paws.",
    ],
    codey: 'Snip snip. Carefully.',
    hints: ["The protocol is written in §2. Follow it to the letter.", 'Cut gold, then black.'],
    answer: 'Cut the gold wire, then the black wire, then Agree. Red fails; black first fails.',
  },
  'unanimous': {
    tier: 5, title: 'Unanimous consent', seconds: 45,
    terms: [
      "This agreement requires the unanimous approval of the CSC committee.",
      "Committee members are easily influenced: persuading one member also changes the minds of the members directly beside, above, and below them.",
      "Two well-chosen conversations should be enough.",
    ],
    codey: 'Committee meetings, my favourite.',
    hints: ["Two well-chosen conversations. A corner and the centre have a lot of neighbours to influence.", 'Click the top-left member and the centre member.'],
    answer: 'Click top-left, then centre. Everyone turns blue → Agree.',
  },
  'ascii': {
    tier: 5, title: 'Low-level consent',
    terms: [
      "This agreement is processed by a very old terminal that only accepts consent in 8-bit ASCII.",
      "Fortunately, the terminal is not picky: the first letter of “Agree”, in uppercase, will suffice.",
      "Each switch is labelled with its place value, for your convenience.",
    ],
    codey: '01000001. Obviously.',
    hints: ["What number is the letter A, in ASCII?", '65 = 64 + 1. Turn on the 64 and 1 switches.'],
    answer: 'Turn on bits 64 and 1 (0100 0001 = “A”), then Agree.',
  },
  // ── Expansion pack ──────────────────────────────────────────────────────
  'bubble-wrap': {
    tier: 1, title: 'Pop culture',
    terms: [
      "Your agreement has been shipped in bubble wrap for its protection.",
      "Most bubbles contain nothing but air. Some bubbles were packed with extra care.",
      "Popping is permitted, encouraged, and deeply satisfying.",
    ],
    codey: 'Pop pop pop pop.',
    hints: ["Not every bubble looks quite the same.", 'Pop the slightly darker bubble (row 3, column 6), then click Agree.'],
    answer: 'Pop the darker bubble (Bubble 18: row 3, column 6) to reveal Agree, then click it.',
  },
  'section-nine': {
    tier: 1, title: 'Section 9',
    terms: [
      "These terms are organized into nine collapsible sections for your reading comfort.",
      "Section 9 is intentionally left empty and may be safely ignored.",
    ],
    codey: 'I always skip to the end.',
    hints: ["Is anything ever really empty?", 'Expand Section 9 and click Agree inside it.'],
    answer: 'Expand Section 9 (“intentionally left empty”) and click the Agree inside.',
  },
  'self-service': {
    tier: 1, title: 'Self-service',
    terms: [
      "To reduce wait times, this agreement is now self-service.",
      "The official stamp has been left on the desk. Please stamp where indicated.",
    ],
    codey: 'Stamp it like you mean it.',
    hints: ["Stamps belong on paper.", 'Drag the Agree stamp onto the dotted signature line (or focus it and press Enter).'],
    answer: 'Drag the Agree stamp onto the signature line (keyboard: focus the stamp, press Enter).',
  },
  'large-print': {
    tier: 2, title: 'Large print',
    terms: [
      "For accessibility, this agreement is displayed at 1400% magnification.",
      "Users are reminded that a word seen up close may belong to a longer one.",
    ],
    codey: 'I can see my house from here.',
    hints: ["Step back and see the whole picture.", 'Drag the zoom slider all the way down, then click Agree (the giant “gree” is Disagree).'],
    answer: 'Zoom out with the slider; the giant “gree” is part of Disagree. Click the real Agree beside it.',
  },
  'not-unlike': {
    tier: 2, title: 'Not unlike',
    terms: [
      "Our legal team has phrased the following question as clearly as they legally could.",
      "Double negatives cancel out, as Codey’s lawyer is fond of saying. Triple negatives are just rude.",
    ],
    codey: 'I don’t not understand.',
    hints: ["Cancel the negatives in pairs.", 'Being unwilling to stop agreeing means you agree, so answer “No”.'],
    answer: 'Answer “No”. (“Unwilling to refrain from not agreeing” = unwilling to agree.)',
  },
  'autocorrect': {
    tier: 2, title: 'Autocorrect',
    terms: [
      "Agreements containing spelling errors cannot be accepted.",
      "Fortunately, our spellchecker has a suggestion.",
    ],
    codey: 'I spell everything with one paw.',
    hints: ["Something on the page is underlined in red.", 'Click the misspelled “agre”, choose “Agree”, then click Agree.'],
    answer: 'Click the red-underlined “agre”, pick the “Agree” suggestion, then click the enabled Agree button.',
  },
  'rebranding': {
    tier: 2, title: 'Rebranding',
    terms: [
      "This page contains one button, and it says what it says.",
      "However, buttons may be renamed by their owners at any time. Double-check before you click.",
    ],
    codey: 'New name, who dis?',
    hints: ["Owners rename things by double-clicking them.", 'Double-click the button label (or press F2), change it to “Agree”, press Enter, then click it.'],
    answer: 'Double-click the Disagree label (or F2), rename it to “Agree”, press Enter, then click it. A plain click on Disagree fails.',
  },
  'copy-that': {
    tier: 2, title: 'Copy that',
    terms: [
      "To agree, please enter your personal consent code exactly as shown.",
      "The code is long. Typing it by hand is permitted but not recommended. Our engineers recommend the oldest trick in the book.",
    ],
    codey: 'Ctrl+C, Ctrl+V. The ancient arts.',
    hints: ["Engineers never type what they can copy.", 'Press the copy button, paste the code into the field, then click Agree.'],
    answer: 'Click “Copy”, paste into the field (or type CSC-4GR33-7H3-73RM5-0F-C0D3Y-W00F-2026), then Agree.',
  },
  'paper-only': {
    tier: 2, title: 'Paper only',
    terms: [
      "Digital signatures are not accepted for this agreement.",
      "Agreements are only valid on paper. A printer has been provided.",
    ],
    codey: 'Paper jam in tray 2.',
    hints: ["What would you do with a paper form?", 'Click Print and sign with the Agree on page 2 of the preview.'],
    answer: 'Click 🖨 Print, then click Agree on page 2 of the print preview.',
  },
  'overleaf': {
    tier: 2, title: 'Overleaf',
    terms: [
      "The front of this page contains our standard terms.",
      "Terms continue overleaf.",
    ],
    codey: 'Always check the back of the menu.',
    hints: ["Paper has two sides.", 'Drag the folded bottom-right corner up to turn the page, then click Agree on the back.'],
    answer: 'Drag the dog-eared corner (or focus it and press Enter) to flip the page; click Agree on the back. Disagree on the front fails.',
  },
  'rain-check': {
    tier: 2, title: 'Rain check',
    terms: [
      "This agreement is printed in invisible ink that only appears on dry paper.",
      "It is raining on campus. It is always raining on campus.",
      "An umbrella is available at the front desk.",
    ],
    codey: 'I hate baths. And rain.',
    hints: ["Keep the paper dry.", 'Drag the umbrella over the document, wait for the ink to appear, then click Agree.'],
    answer: 'Drag the umbrella over the paper (or focus it and press Enter); once dry, Agree appears.',
  },
  'classified': {
    tier: 3, title: 'Classified', seconds: 35,
    terms: [
      "This agreement is classified. All button labels have been encrypted.",
      "Our security team shifted every letter three places along the alphabet. Codey says it is unbreakable.",
    ],
    codey: 'Julius would be proud.',
    hints: ["Shift each letter back by three.", 'DJUHH decodes to AGREE. Click it.'],
    answer: 'Click “DJUHH” (Caesar shift of AGREE). GLVDJUHH = DISAGREE, others fail.',
  },
  'binary-search': {
    tier: 3, title: 'Binary search', seconds: 45,
    terms: [
      "Codey is thinking of a number between 1 and 100. Agreement requires guessing it.",
      "You have seven guesses. Codey will only answer “higher” or “lower”.",
      "Seven is enough, if you’ve been paying attention in CS 136.",
    ],
    codey: 'I’m thinking of a number…',
    hints: ["Halve the range every time.", 'Always guess the middle of the remaining range (50, then 25 or 75, …).'],
    answer: 'Binary search: guess the midpoint each time; you always find it within 7 guesses.',
  },
  'design-handoff': {
    tier: 3, title: 'Design handoff', seconds: 40,
    terms: [
      "The Agree button was designed, approved and shipped. Then the designer went home.",
      "Before leaving, they hid it, locked it and buried it under another layer. Developers have full edit access.",
    ],
    codey: 'Can we make the logo bigger?',
    hints: ["Look at the Layers panel.", 'Show the Agree layer, unlock it, bring it forward, then click it on the canvas.'],
    answer: 'In Layers: show 👁, unlock 🔒 and bring ↑ the “Agree button” layer, then click Agree on the canvas.',
  },
  'acrostic': {
    tier: 3, title: 'Read between the lines', seconds: 45,
    terms: [
      "The clauses below were shuffled during printing.",
      "Clauses must be read in numerical order. Their meaning becomes clear from the very first letter.",
    ],
    codey: 'Read it top to bottom. Slowly.',
    hints: ["Sort first, then read down the left edge.", 'Move the clauses into order §1–§5; the first letters spell AGREE — click them.'],
    answer: 'Use the arrows to sort clauses §1–§5; the first letters form AGREE, which becomes clickable.',
  },
  'save-the-date': {
    tier: 3, title: 'Save the date', seconds: 35,
    terms: [
      "Codey only signs agreements on their birthday.",
      "Codey was born on π Day, which explains a great deal.",
    ],
    codey: 'I’ll have a slice. Of pie.',
    hints: ["π ≈ 3.14", 'Go back to March and pick the 14th, then Agree.'],
    answer: 'Navigate the calendar to March, select 14, then click Agree. Any other date fails.',
  },
  'pull-request': {
    tier: 3, title: 'Pull request',
    terms: [
      "Both buttons have been placed in a cage for safekeeping.",
      "Only the metal button is legally binding. The wooden one is decorative and, frankly, a little splintery.",
      "A magnet has been provided for authorized pulls.",
    ],
    codey: 'Opposites attract.',
    hints: ["Which button would a magnet care about?", 'Drag the magnet to the cage; the metal Agree slides out. Click it.'],
    answer: 'Drag the magnet next to the cage (or focus it and press Enter); the metal Agree slides out — click it.',
  },
  'spot-difference': {
    tier: 3, title: 'Spot the difference', seconds: 40,
    terms: [
      "A duplicate of this agreement was filed by mistake.",
      "Only the original copy is binding. Please identify every way in which the copy differs.",
    ],
    codey: 'They look the same to me. I’m a dog.',
    hints: ["Compare the right-hand copy carefully: title, picture, seal.", 'In the copy: the misspelled title, the flipped Codey and the red seal. Then Agree.'],
    answer: 'Click the 3 differences in the copy (title spelling, flipped Codey, red seal), then Agree.',
  },
  'dewey': {
    tier: 3, title: 'Dewey decimal',
    terms: [
      "Your agreement has been catalogued in the Davis Centre Library.",
      "It is shelved under QA76.A37. Please do not reshelve it yourself.",
      "Borrowing the wrong book incurs a fine and a disappointed look.",
    ],
    codey: 'Shh. Library voice.',
    hints: ["Never judge a book by its title. Read the call numbers.", 'Pull out QA76.A37 (titled “Fine Print”) — not A367 or A38 — and click Agree on its cover.'],
    answer: 'Click the spine labelled QA76.A37 (“Fine Print”), then Agree on the cover. Other books fail, including the one titled “Agreements”.',
  },
  'campus-map': {
    tier: 3, title: 'Campus map', seconds: 35,
    terms: [
      "Agreements are processed in person during office hours.",
      "Office hours are held in the Davis Centre, room 1350. Bring snacks.",
    ],
    codey: 'I always get lost in MC.',
    hints: ["Find the right building first.", 'Click DC on the map, then room 1350, then Agree.'],
    answer: 'Click DC on the map, then room 1350, then the Agree at the door.',
  },
  'paw-print': {
    tier: 3, title: 'Paw print', seconds: 35,
    terms: [
      "Codey will only shake on an agreement with someone who knows the secret handshake.",
      "Watch Codey’s paw closely. Then match it.",
    ],
    codey: 'Boop. Boop. Boop-boop.',
    hints: ["Watch which toe beans light up, in order.", 'The sequence is beans 2, 4, 1, 3, 2. Press Show me to replay it.'],
    answer: 'Tap toe beans 2 → 4 → 1 → 3 → 2 (the order they light up), then Agree. A wrong bean fails.',
  },
  'pattern-matching': {
    tier: 4, title: 'Pattern matching', seconds: 40,
    terms: [
      "Our legal department has upgraded to regular expressions.",
      "Please select every label matching /^Ag+re{2}$/, and nothing else.",
    ],
    codey: '.* matches my mood.',
    hints: ["One or more g, then exactly two e, nothing after.", 'Select Agree, Aggree and Agggree, then Confirm.'],
    answer: 'Select exactly Agree, Aggree, Agggree → Confirm → Agree. Wrong selection fails.',
  },
  'hanoi': {
    tier: 4, title: 'Tower of Codey', seconds: 45,
    terms: [
      "Your agreement arrived as a tower and must be moved to the rightmost peg.",
      "Move one disc at a time. A larger disc may never sit on a smaller one. Monks have done this for centuries.",
    ],
    codey: 'Recursion, but make it wooden.',
    hints: ["Smallest disc moves every other turn.", 'Moves: 1→3, 1→2, 3→2, 1→3, 2→1, 2→3, 1→3.'],
    answer: 'Click pegs: 1→3, 1→2, 3→2, 1→3, 2→1, 2→3, 1→3; the finished tower becomes Agree.',
  },
  'telegraph': {
    tier: 4, title: 'Telegraph', seconds: 50,
    terms: [
      "This agreement is transmitted by telegraph. Please tap out your consent in Morse code.",
      "Reference table: A ·—   D —··   E ·   G ——·   I ··   R ·—·   S ···",
      "End each letter before starting the next. Stop.",
    ],
    codey: '·—· ··— ··-· ··-·',
    hints: ["Spell the word you want, one letter at a time.", 'A ·— | G ——· | R ·—· | E · | E · — press “Next letter” after each.'],
    answer: 'Tap ·— next, ——· next, ·—· next, · next, · next → AGREE, then Agree.',
  },
  'hide-and-seek': {
    tier: 4, title: 'Hide and seek', seconds: 45,
    terms: [
      "To prove you are human, select every image containing Codey.",
      "Codey is very good at hide and seek. Look at edges, reflections and patterns.",
      "Codey never goes anywhere without their glasses.",
    ],
    codey: 'You’ll never find me.',
    hints: ["Not every blue dog is Codey.", 'Codey is in tiles 1, 3, 4, 6, 8 and 9 — not the glasses-free plush, the geese or the fox.'],
    answer: 'Select tiles 1, 3, 4, 6, 8, 9 (ears over books, head over the snowdrift, mug print, reflection, constellation, glasses in box) → Verify → Agree.',
  },
  'chain-reaction': {
    tier: 4, title: 'Chain reaction', seconds: 40,
    terms: [
      "This agreement is accepted automatically by a highly sophisticated domino mechanism.",
      "One push is all it takes. Mind the gap.",
    ],
    codey: 'Clack clack clack clack.',
    hints: ["A chain is only as good as its missing link.", 'Drag the spare domino into the gap, then Push. Click the Agree it unlocks.'],
    answer: 'Place the spare domino in the gap (drag, or focus + Enter), press Push, then click Agree.',
  },
  'balanced-terms': {
    tier: 4, title: 'Balanced terms',
    terms: [
      "This agreement must be perfectly balanced, as all things should be.",
      "Clause 7 weighs exactly 7 kg. Please counterweigh it using the weights provided.",
    ],
    codey: 'I weigh 11 kg. Don’t tell anyone.',
    hints: ["Make the right side total 7.", 'Put 3 kg and 4 kg on the right pan (or 1 + 6), then Agree.'],
    answer: 'Place weights totalling 7 kg (e.g. 3 + 4) on the right pan; once level, click Agree.',
  },
  'slippery-slope': {
    tier: 5, title: 'Slippery slope', seconds: 50,
    terms: [
      "The floor of this agreement was waxed this morning.",
      "Once set in motion, your agreement will slide until it hits something.",
      "Please bring it to rest on the signature square.",
    ],
    codey: 'Wheeeeee—',
    hints: ["Rocks are your brakes.", 'Slide → ↑ → ↑ ←.'],
    answer: 'Slide right, up, right, up, left (arrow buttons or arrow keys), then click Agree.',
  },
  'checkmate': {
    tier: 5, title: 'Checkmate', seconds: 45,
    terms: [
      "Your agreement is a chess piece and moves like a knight.",
      "It must reach the signature square in four moves or fewer.",
      "Squares occupied by Disagree are off-limits.",
    ],
    codey: 'L-shaped thinking.',
    hints: ["Two squares one way, one square the other.", 'Route: c4 → e5 → d3 → e1 (columns a–e left to right, rows 1–5 top to bottom).'],
    answer: 'Knight path from bottom-left: (row 4, col 3) → (row 5, col 5) → (row 3, col 4) → (row 1, col 5), then Agree.',
  },
  'measured-consent': {
    tier: 5, title: 'Measured consent', seconds: 50,
    terms: [
      "Consent must be measured precisely: exactly four litres, no more, no less.",
      "You have a 3-litre jug and a 5-litre jug. Neither is marked.",
      "Pouring the wrong amount into the consent slot is considered a spill.",
    ],
    codey: 'I only drink from puddles.',
    hints: ["Use the small jug to take water away from the big one.", 'Fill 5, pour into 3, empty 3, pour 5→3, fill 5, pour 5→3: the 5 L jug now holds 4 L.'],
    answer: 'Fill 5 → pour 5→3 → empty 3 → pour 5→3 → fill 5 → pour 5→3 → pour 5 into slot → Agree.',
  },
} satisfies Record<string, LevelMeta>;

export type LevelId = keyof typeof levelCopy;

/** The same data, typed uniformly so optional fields such as `seconds` can be read for any id. */
export const levelMeta: Readonly<Record<LevelId, LevelMeta>> = levelCopy;

export const levelIds = Object.keys(levelCopy) as LevelId[];

export function isLevelId(id: string): id is LevelId {
  return Object.hasOwn(levelCopy, id);
}
