import { ParentingTip, VideoHighlight, QAQuestion } from '../types/blog';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_quickcut_kids_1793098115170.jpg';

export const INITIAL_PARENTING_TIPS: ParentingTip[] = [
  {
    id: 'tip-first-haircut-blueprint',
    indexNumber: '01',
    title: 'The Zero-Tears First Haircut Blueprint: How to Prepare 48 Hours Before the Chair',
    subtitle: 'Replacing unfamiliar salon sounds and textures with predictable play cues at home.',
    category: 'First Haircuts',
    ageRange: '12–36 Months',
    readTimeMinutes: 5,
    publishedDate: 'October 19, 2026',
    authorName: 'Maya Lin-Copt',
    authorRole: 'Quickcut Kids Founder & Pediatric Grooming Specialist',
    imageUrl: '/src/assets/images/tip_first_haircut_prep_1793098116975.jpg',
    imageAlt: 'Toddler sitting on a woven rug holding a wooden comb and looking in a round mirror beside a parent',
    imageCaption: 'Fig. 1 — Familiarizing toddlers with hand mirrors and wooden combs on the living room rug 48 hours prior to an appointment.',
    summary:
      'Most first-haircut tears happen before the scissors ever open: the tight collar of a nylon cape, the hum of clippers near the ears, and sitting in a high chair in front of strangers. Here is the exact 3-step rehearsal we share on our Quickcut Kids Facebook page.',
    pullQuote:
      'When a toddler holds the comb first and watches you trim a pretend lock on their favorite teddy bear, the salon chair transforms from an exam room into a game.',
    keyTakeaways: [
      'Book during your child’s peak post-snack window—never within 45 minutes of nap time.',
      'Swap the word "cut" (which toddlers associate with boo-boos) for "trim" or "tidy-up".',
      'Bring a familiar cotton towel or soft button-up shirt if your child dislikes cape velcro around the neck.'
    ],
    bodyParagraphs: [
      'During the toddler years, children experience hair and fingernails as extensions of their own body. When we announce we are going to "cut your hair," a two-year-old hears that something might hurt. On the Quickcut Kids Facebook community, parents consistently report an immediate drop in resistance simply by switching vocabulary to "a fresh tidy-up" or "bouncing the curls."',
      'Two days before your visit, set up a five-minute "Mirror & Mist Game" on the living room rug. Let your child hold a small hand mirror while you mist warm water onto their hands first, then onto the ends of their hair. Count to five out loud with each comb stroke so they learn that every touch has a clear beginning and a predictable finish.',
      'Finally, pack two high-engagement hand toys—such as a silicone popper or a small sticker book—that keep their hands busy at lap level without tilting their chin downward.'
    ],
    prepChecklist: [
      {
        id: 'chk-1',
        label: 'Practice the "Warm Mist & Count to 5" game at bath time',
        detail: 'Spray warm water on hands first so the mist sound is never a surprise.'
      },
      {
        id: 'chk-2',
        label: 'Use "trim" or "tidy-up" instead of "cut"',
        detail: 'Toddlers associate the word "cut" with scraped knees and bandages.'
      },
      {
        id: 'chk-3',
        label: 'Pack a spare change of shirt + snack for before the chair',
        detail: 'Loose stray hairs on a collar are the #1 trigger for late-appointment squirming.'
      },
      {
        id: 'chk-4',
        label: 'Let your child introduce their toy to the stylist first',
        detail: 'A 10-second pretend trim on a plush toy builds immediate visual trust.'
      }
    ],
    fbPostEngagement: {
      shares: 1420,
      saves: 2890,
      commentsCount: 314
    }
  },
  {
    id: 'tip-sensory-sound-desensitization',
    indexNumber: '02',
    title: 'Sensory-Friendly Grooming for Sound-Sensitive & Neurodivergent Kids',
    subtitle: 'Practical environmental adjustments for clippers, wet hair sensations, and neck tickles.',
    category: 'Sensory Care',
    ageRange: '2–8 Years',
    readTimeMinutes: 6,
    publishedDate: 'October 12, 2026',
    authorName: 'Dr. Elena Rostova, OTD',
    authorRole: 'Pediatric Occupational Therapist & Quickcut Advisory Contributor',
    imageUrl: '/src/assets/images/tip_sensory_friendly_routine_1793098118112.jpg',
    imageAlt: 'Calm sensory-friendly grooming bench with organic waffle cotton towels and a wooden boar-bristle brush',
    imageCaption: 'Fig. 2 — Soft waffle-weave towels and natural boar bristles provide steady proprioceptive input instead of scratchy light touch.',
    summary:
      'Light, unpredictable touches around the ears and neck activate the nervous system’s fight-or-flight reflex. By pairing deep-pressure input withscissor-over-comb alternatives, sensory-sensitive kids can stay regulated throughout their trim.',
    pullQuote:
      'Light ticklish brushing alerts the nervous system; steady, predictable palm pressure on the shoulders calms it down.',
    keyTakeaways: [
      'Request scissor-over-comb work around the ears instead of electric trimmers for sound-sensitive children.',
      'Use a weighted lap pad or firm parent hug to provide grounding proprioceptive input.',
      'Keep a dry soft makeup brush in your child’s hand so they are in control of brushing away stray hairs.'
    ],
    bodyParagraphs: [
      'For children with sensory processing sensitivities, the hardest part of a haircut is rarely the length of the appointment—it is the combination of buzzing acoustic frequencies around the mastoid bone behind the ear and tiny falling hairs tickling the collarbone.',
      'Before starting, ask your stylist to place a folded waffle cotton towel snugly around the shoulders rather than fastening a slick nylon cape. Giving your child a soft, clean powder brush so they can sweep stray hairs off their own cheeks hands them active agency whenever they feel an itch.',
      'If using electric clippers at home or in the studio, let the child touch the back of the humming clipper with their palm while it is turned on, then touch it to their shoulder before bringing it anywhere near the neckline.'
    ],
    prepChecklist: [
      {
        id: 'chk-5',
        label: 'Introduce humming vibration via an electric toothbrush at home',
        detail: 'Let your child touch the handle to the back of their hand and shoulder.'
      },
      {
        id: 'chk-6',
        label: 'Bring noise-dampening ear defenders or favorite bone-conduction audio',
        detail: 'Leaves the ears accessible for trimming when using compact in-ear buds or quiet pauses.'
      },
      {
        id: 'chk-7',
        label: 'Hand your child the "Helper Brush" for stray hairs',
        detail: 'Self-directed brushing prevents the startle reflex from unexpected neck tickles.'
      }
    ],
    fbPostEngagement: {
      shares: 980,
      saves: 2150,
      commentsCount: 198
    }
  },
  {
    id: 'tip-montessori-morning-hair-station',
    indexNumber: '03',
    title: 'Building a 3-Minute Montessori Morning Hair Station for Independent Preschoolers',
    subtitle: 'How lowering the mirror by 18 inches ends the 7:45 AM detangling standoff.',
    category: 'Morning Routines',
    ageRange: '3–6 Years',
    readTimeMinutes: 4,
    publishedDate: 'October 04, 2026',
    authorName: 'Maya Lin-Copt',
    authorRole: 'Quickcut Kids Founder & Pediatric Grooming Specialist',
    imageUrl: '/src/assets/images/tip_toddler_morning_independence_1793098119880.jpg',
    imageAlt: 'Preschool child smiling while brushing their own hair at a child-height wooden Montessori mirror',
    imageCaption: 'Fig. 3 — A low shatterproof mirror with two pre-measured hair tie bowls invites ownership over the morning routine.',
    summary:
      'When preschoolers cannot see what is happening behind their head, every tug of the brush feels arbitrary. Setting up a low mirror station turns a daily power struggle into a self-directed morning milestone.',
    pullQuote:
      'Children rarely resist being neat; they resist having something done to their body when they cannot see the progress.',
    keyTakeaways: [
      'Anchor the bottom of a shatterproof mirror 16–20 inches from the floor with a small wooden tray.',
      'Hold the hair shaft firmly above the tangle so pulling never reaches the scalp.',
      'Offer a binary choice every morning: "Two space buns or one low braid today?"'
    ],
    bodyParagraphs: [
      'Think about how unsettling it would be if someone stood behind you every morning pulling at your scalp while you stared at a blank wall. That is the daily reality for most three- and four-year-olds during the school rush.',
      'By placing a child-height mirror and a small wooden caddy containing only three items—a flexible detangling brush, a continuous-mist aloe water bottle, and two snag-free elastics—your child can watch the brush glide through the ends.',
      'Teach the "Hold the Bridge" rule: show your child how to grip their own ponytail mid-shaft with one hand while brushing just the bottom two inches first. Within two weeks, most four-year-olds proudly complete the first pass themselves.'
    ],
    prepChecklist: [
      {
        id: 'chk-8',
        label: 'Set up a child-eye-level mirror with only 3 tools on the tray',
        detail: 'Fewer choices eliminate decision fatigue before school.'
      },
      {
        id: 'chk-9',
        label: 'Detangle from the bottom 2 inches upward while gripping above the knot',
        detail: 'Isolates tension in your fingers so the scalp feels zero tug.'
      },
      {
        id: 'chk-10',
        label: 'Pre-select two style options the night before',
        detail: 'Binary choices satisfy autonomy without delaying breakfast.'
      }
    ],
    fbPostEngagement: {
      shares: 760,
      saves: 1640,
      commentsCount: 142
    }
  },
  {
    id: 'tip-curl-hydration-bedhead',
    indexNumber: '04',
    title: 'Curly & Coily Kid Hair Care: Stopping Morning Frizz Without Heavy Product Buildup',
    subtitle: 'Nighttime satin pillowcase swaps and lightweight slip formulas for delicate kid scalps.',
    category: 'Curl & Texture Care',
    ageRange: '2–10 Years',
    readTimeMinutes: 5,
    publishedDate: 'September 26, 2026',
    authorName: 'Devon Brooks',
    authorRole: 'Senior Curl Specialist at Quickcut Kids',
    imageUrl: '/src/assets/images/tip_sensory_friendly_routine_1793098118112.jpg',
    imageAlt: 'Natural hair care bottles, wooden wide-tooth comb, and soft linen towel on a wooden bench',
    imageCaption: 'Fig. 4 — Wide-tooth wooden combs and warm water + marshmallow-root slip prevent mechanical breakage on fine curls.',
    summary:
      'Dry-brushing curly or coily kid hair snaps delicate curl clumps and causes painful static snags. Learn our 90-second damp refresh protocol and bedtime protection habits.',
    pullQuote:
      'Never let a dry brush touch a dry curl. Water is the moisturizer; leave-in conditioner simply seals that water inside.',
    keyTakeaways: [
      'Swap standard cotton pillowcases (whichwick moisture out of curls) for breathable satin pillowcases.',
      'Always detangle only when hair is misted with warm water and coated with a lightweight slip detangler.',
      'Part hair into 4 manageable quadrants secured with soft alligator clips before combing.'
    ],
    bodyParagraphs: [
      'One of the most frequent questions in our Quickcut Kids Facebook inbox comes from parents whose toddlers developed sudden spiral curls around age two. Standard baby brushes turn those curls into a tangled halo—and worse, pull painfully at the crown.',
      'Retire fine-toothed plastic combs immediately. Instead, mix 85% warm filtered water with 15% fragrance-free kids leave-in conditioner in a fine-mist bottle. Mist just the tangled outer layer each morning, smooth downward using "praying hands," and scrunch gently.',
      'At night, even if your child refuses to keep a bonnet on, switching their crib or toddler bed sheet/pillowcase to OEKO-TEX certified satin cuts morning knots by more than half.'
    ],
    prepChecklist: [
      {
        id: 'chk-11',
        label: 'Switch cotton crib/toddler pillowcase to breathable satin',
        detail: 'Reduces friction knots at the back of the head overnight by over 60%.'
      },
      {
        id: 'chk-12',
        label: 'Never brush curls dry—mist with warm water + leave-in first',
        detail: 'Water restores elasticity so curls bounce back instead of snapping.'
      }
    ],
    fbPostEngagement: {
      shares: 1190,
      saves: 2430,
      commentsCount: 267
    }
  }
];

export const INITIAL_VIDEO_HIGHLIGHTS: VideoHighlight[] = [
  {
    id: 'vid-cape-magic-trick',
    episodeNumber: 'Reel #42',
    title: 'The "Superhero Cape Peekaboo" Method That Stops Salon Chair Refusal in 30 Seconds',
    category: 'Sensory Techniques',
    durationFormatted: '02:15',
    durationSeconds: 135,
    publishedDate: 'October 22, 2026',
    viewsFormatted: '148.2K views',
    helpfulCount: 4320,
    thumbnailUrl: '/src/assets/images/video_sensory_capes_highlight_1793098120190.jpg',
    thumbnailAlt: 'Stylist kneeling at eye level showing a patterned cape to a smiling toddler in a sunlit studio',
    stylistName: 'Sarah Jenkins',
    stylistSpecialty: 'Lead Toddler Whisperer · 9 Years at Quickcut Kids',
    summary:
      'Watch how Sarah kneels below eye level and lets 3-year-old Leo choose the cape pattern and "wrap the stylist’s arm" first before stepping anywhere near the chair.',
    fbReelUrl: 'https://www.facebook.com/QuickcutKids',
    chapters: [
      {
        timeSeconds: 0,
        timeFormatted: '00:00',
        title: 'Eye-Level Greeting on the Floor',
        coachNote: 'Never tower over a hesitant toddler. Kneeling immediately lowers heart rate and defensive posture.'
      },
      {
        timeSeconds: 38,
        timeFormatted: '00:38',
        title: 'The Tactile Cape Choice',
        coachNote: 'Offering two cape patterns shifts the child’s brain from "Am I safe?" to "Do I want dinosaurs or stars?"'
      },
      {
        timeSeconds: 82,
        timeFormatted: '01:22',
        title: 'Clip-On Towel Buffer Instead of Tight Velcro',
        coachNote: 'Folding a soft jersey cotton strip inside the neckline prevents prickly hair from slipping down the shirt.'
      }
    ],
    transcriptExcerpt:
      '"Notice how I don’t ask Leo to sit in the chair right away. First, I kneel down to his eye height and ask: Leo, do you think my arm fits inside this dinosaur cape? Once he laughs and puts the cape on my arm, the cape isn’t scary anymore..."'
  },
  {
    id: 'vid-bang-trim-between-visits',
    episodeNumber: 'Reel #39',
    title: 'How to Trim Toddler Fringe at Home Without Creating "Staircase Bangs"',
    category: 'At-Home Trim Guides',
    durationFormatted: '03:05',
    durationSeconds: 185,
    publishedDate: 'October 09, 2026',
    viewsFormatted: '96.4K views',
    helpfulCount: 3110,
    thumbnailUrl: '/src/assets/images/tip_first_haircut_prep_1793098116975.jpg',
    thumbnailAlt: 'Parent and toddler practicing with comb and hand mirror on a living room rug',
    stylistName: 'Maya Lin-Copt',
    stylistSpecialty: 'Founder & Master Pediatric Stylist',
    summary:
      'Need to clear hair out of your child’s eyes between studio visits? Learn why you must always trim bangs dry, why pulling downward causes a 1-inch bounce-up surprise, and how to point-cut safely.',
    fbReelUrl: 'https://www.facebook.com/QuickcutKids',
    chapters: [
      {
        timeSeconds: 0,
        timeFormatted: '00:00',
        title: 'Why Wet Bangs Always Shrink Too Short',
        coachNote: 'Wet hair stretches up to 1.5 cm longer than its natural dry fall—especially around cowlicks.'
      },
      {
        timeSeconds: 65,
        timeFormatted: '01:05',
        title: 'The Triangle Sectioning Rule',
        coachNote: 'Only bring forward the hair between the outer arches of the eyebrows; clip the sides back first.'
      },
      {
        timeSeconds: 125,
        timeFormatted: '02:05',
        title: 'Zero-Tension Bridge Grip & Vertical Point Snips',
        coachNote: 'Hold the hair between index and middle finger above the bridge of the nose so scissors never point horizontal.'
      }
    ],
    transcriptExcerpt:
      '"Rule number one for home fringe rescues: put the water spray bottle down! When you wet a toddler’s bangs and pull them flat with a comb, the moment they dry they spring half an inch above the eyebrows..."'
  },
  {
    id: 'vid-ear-tickle-scissor-trick',
    episodeNumber: 'Reel #35',
    title: 'The Comb-Shield Technique for Kids Who Flinch When Scissors Touch Near Their Ears',
    category: 'Stylist Tricks',
    durationFormatted: '01:50',
    durationSeconds: 110,
    publishedDate: 'September 28, 2026',
    viewsFormatted: '112.8K views',
    helpfulCount: 3890,
    thumbnailUrl: '/src/assets/images/hero_quickcut_kids_1793098115170.jpg',
    thumbnailAlt: 'Smiling mother and child in sunlit family studio',
    stylistName: 'Devon Brooks',
    stylistSpecialty: 'Senior Curl & Precision Specialist',
    summary:
      'The metallic "snip-snip" sound right next to the ear canal can startle even calm kids. Here is how our stylists fold the ear gently forward and keep a wide wooden comb anchored as a steady tactile guard.',
    fbReelUrl: 'https://www.facebook.com/QuickcutKids',
    chapters: [
      {
        timeSeconds: 0,
        timeFormatted: '00:00',
        title: 'Demonstrating the Scissor Sound in Front of the Eyes First',
        coachNote: 'When kids see the scissors open and close in front of them, their brain maps the sound so they don’t turn their head.'
      },
      {
        timeSeconds: 45,
        timeFormatted: '00:45',
        title: 'Anchoring the Comb Guard Against the Temple',
        coachNote: 'Steady comb pressure gives the child a clear boundary buffer between the shears and their ear.'
      },
      {
        timeSeconds: 85,
        timeFormatted: '01:25',
        title: 'The "5-Snip Countdown" Rhythm',
        coachNote: 'Counting "1, 2, 3, 4, 5—pause!" out loud lets kids stay still because they know the exact second the pause arrives.'
      }
    ],
    transcriptExcerpt:
      '"Kids turn their heads toward the scissors because they want to see what’s making that clicking sound behind their ear. So we show them the click in front of their nose first, then count five snips out loud..."'
  }
];

export const INITIAL_QA_QUESTIONS: QAQuestion[] = [
  {
    id: 'qa-1',
    parentName: 'Hannah M.',
    childAge: '2.5 years old',
    topic: 'Sensory Sensitivity',
    createdAt: '2 days ago',
    title: 'My son loves baths but panics the moment clippers buzz near the back of his neck. Can he get a neat short cut with scissors only?',
    details:
      'He is 2.5 and has mild auditory sensitivity. Our last attempt at a regular barbershop ended before we even started because the buzz echoed across the room. Is a full scissor cut realistic for a wiggly toddler?',
    upvotes: 48,
    isAnsweredByTeam: true,
    replies: [
      {
        id: 'rep-101',
        authorName: 'Sarah Jenkins',
        authorBadge: 'Quickcut Lead Stylist',
        createdAt: '2 days ago',
        body: '100% yes, Hannah! Roughly 40% of our toddler appointments at Quickcut Kids are 100% scissor-over-comb—zero electric clippers turned on in the room. With a soft taper comb and blunt-tip texturizing shears, we can get a super clean, natural neckline around the ears and nape in under 12 minutes while he plays on your lap.',
        helpfulVotes: 39
      },
      {
        id: 'rep-102',
        authorName: 'Marcus T. (Dad of twins)',
        authorBadge: 'Community Parent',
        createdAt: '1 day ago',
        body: 'We switched to all-scissor trims for our 3-year-old six months ago after reading Sarah’s post on the FB page. Also, booking the first 9:00 AM slot when the studio is quiet made a night-and-day difference!',
        helpfulVotes: 16
      }
    ]
  },
  {
    id: 'qa-2',
    parentName: 'Priya K.',
    childAge: '4 years old',
    topic: 'Curls & Detangling',
    createdAt: '5 days ago',
    title: 'How often should we actually shampoo 3B/3C toddler curls vs. co-washing after playground days?',
    details:
      'My daughter runs hard at preschool and gets sand or sweat in her scalp, but shampooing more than once a week leaves her ringlets dry and tangled at the nape.',
    upvotes: 35,
    isAnsweredByTeam: true,
    replies: [
      {
        id: 'rep-201',
        authorName: 'Devon Brooks',
        authorBadge: 'Quickcut Lead Stylist',
        createdAt: '4 days ago',
        body: 'Great question, Priya! For active 3B/3C preschoolers, we recommend a sulfate-free gentle cleanser once every 7–10 days, and a warm water + silicone-free conditioner rinse ("co-wash") mid-week after sweaty playground days. Focus the fingertips gently on the scalp to rinse away sand, then apply leave-in while the hair is still soaking wet in the tub before blotting with a microfiber or waffle towel.',
        helpfulVotes: 28
      }
    ]
  },
  {
    id: 'qa-3',
    parentName: 'Lucas & Claire R.',
    childAge: '16 months old',
    topic: 'Toddlers (1–3 yrs)',
    createdAt: '1 week ago',
    title: 'Should we wait until our 16-month-old’s top hair grows fuller before trimming the long baby mullet in the back?',
    details:
      'The hair at the nape of his neck curls over his shirt collar and gets knotted in his car seat, while the top and sides are still wispy baby fluff. Will trimming just the back look uneven?',
    upvotes: 29,
    isAnsweredByTeam: true,
    replies: [
      {
        id: 'rep-301',
        authorName: 'Maya Lin-Copt',
        authorBadge: 'Quickcut Lead Stylist',
        createdAt: '6 days ago',
        body: 'We call this the "Car Seat Collar Rescue," and it is our most common 14-to-18-month appointment! Trimming just the wispy tail at the nape so it blends softly into the crown immediately makes the top look thicker and fuller—plus it stops car-seat friction knots. And don’t worry, we save that first baby curl in a keepsake envelope for you!',
        helpfulVotes: 31
      }
    ]
  }
];
