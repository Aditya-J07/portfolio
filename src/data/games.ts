export interface Game {
    id: string;
    name: string;
    description: string;
    tech: string[];
    features: string[];
    playUrl: string;
    embedUrl?: string;
}

export const games: Game[] = [
    {
        id: 'knightfall',
        name: 'Knightfall: Dimensional Rifts',
        description: 'A 2D adventure platformer with dimension-hopping mechanics. Players leap through multiple worlds, conquering perilous paths and environmental hazards to restore balance across dimensions.',
        tech: ['Godot Engine', 'GDScript'],
        features: ['Dimension-switching mechanics', 'Precise physics', 'Challenging level design'],
        playUrl: 'https://prolly-adi.itch.io/knightfall-dimensional-rifts',
        embedUrl: 'https://itch.io/embed/3351031?border_width=0&bg_color=d69980&fg_color=222222&link_color=d93737&border_color=db805c'
    },
    {
        id: 'rats-vs-cats',
        name: 'Rats vs Cats',
        description: 'A survival shooter where you defend against the cat apocalypse using a cheese gun. Features wave-based combat and enemy AI.',
        tech: ['Godot Engine', 'GDScript'],
        features: ['Weapon mechanics', 'Enemy AI', 'Wave-based spawning'],
        playUrl: 'https://prolly-adi.itch.io/ratsvscats',
        embedUrl: 'https://itch.io/embed/3357764?border_width=0&bg_color=111111&fg_color=ffeb12&link_color=d99f15&border_color=333333'
    },
    {
        id: 'keyloops',
        name: 'KeyLOOps',
        description: 'A pattern-recognition rhythm game created during a game jam. Players must remember and repeat sequences with progressive difficulty.',
        tech: ['Godot Engine', 'GDScript', 'GDShaders'],
        features: ['Input timing systems', 'Sequence memorization'],
        playUrl: 'https://prolly-adi.itch.io/keyloops',
        embedUrl: 'https://itch.io/embed/3771475?border_width=0&bg_color=e3d92c&fg_color=222222&link_color=a60c00&border_color=ab6603'
    },
    {
        id: 'biscuit-trust',
        name: 'Biscuit Trust',
        description: 'A decision-based strategy game centered on trust mechanics and resource management. Features game theory concepts.',
        tech: ['Godot Engine', 'GDScript'],
        features: ['Decision-based gameplay', 'Resource management'],
        playUrl: 'https://prolly-adi.itch.io/biscuit-trust',
        embedUrl: 'https://itch.io/embed/3852042?border_width=0&bg_color=e39e4b&fg_color=2d2a14&link_color=fff2c4&border_color=cec193'
    },
];
