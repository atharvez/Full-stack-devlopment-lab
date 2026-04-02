export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: 'Pokémon TCG' | 'Magic: The Gathering' | 'Yu-Gi-Oh!';
  rarity: string;
  rarityScale?: 'Mythic Rare' | 'Holo Rare' | 'Secret Rare';
  image: string;
  tag?: string;
  description?: string;
  expansion?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Shadowless Charizard',
    price: 12450,
    category: 'Pokémon TCG',
    rarity: 'Gem Mint 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7QnuyzT37xIMN-F2EvAJUChhRXzFpLVb1oaGiQjqLiXybg3VssZxO8oAEqpYAphxY4S4U-bRtcL-_ldj0jHF8C_5F_0jtUugcj70uxUrfxhKtEklUZQT6s98KcXlIK3oXQsUbhP_6EN-VItJqSRdLye9dI-ZzMSbMKzCfVuf30h0MvDuaiRNEsf_4CkHIBLqAJ1nD9FKUZFhVGknJhDf3CfZXCRoD86XkwAgr1xAjdFGHk5kEnZvXjhgHnGFEKrGeH1-tTofVIKY',
    tag: 'GEM Mint 10',
    description: 'A legendary holographic Charizard from the base set, shadowless edition.'
  },
  {
    id: '2',
    name: 'Black Lotus',
    price: 45000,
    category: 'Magic: The Gathering',
    rarity: 'Alpha Edition',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNZpYjB5uHAtr5YQn0ALhIWGcaKtcHSCnKwnG6LY11osQPddZB7dk54WheYRtpiLzp5Ae2xR1Qh2-laf6KQdyzG3VLOJ8i9wqvSTzVqD11mHEZIWgdRLMPYK_h8ERs_xi9m8szkJRa46RU61KBh-jtANBYn8lNPdZ3iZ0sScbj724etC-cDkb6DQ713bsaKle_hAenu_aZeSU6cTtxesB92BPhh78xabH_RG2nN8ubbrIPjRjd7P7F29dHVrM-toa7PnmrutjF5Ts',
    tag: 'ALPHA EDITION'
  },
  {
    id: '3',
    name: 'Blue-Eyes White Dragon',
    price: 3200,
    category: 'Yu-Gi-Oh!',
    rarity: 'First Edition',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALRebq9yafrJFtXAb4kvgMcHDhmA0gq-AppjerGpiyrKMWuHoD3ml9VXtdgIOfqr7-benyAfD3awnKd4_WoaKrQqmdL2lj4yLWBUGldj_qlDYiFWK0ZVmawNMF0Kn8c8RocyJV8QBHir7QSAcZm4CJ200ecIoK5Gp_Uz_4FOdcGvpXS7jbLs-nZWdcU7qayW0sE_8QI1eWPJfmM5f7o9C92U9hOZBacYg41ByBFwrHFQ5fmfGuW9xw7MlmAw6T72yRGW82k1MX8b8',
    tag: 'FIRST EDITION'
  },
  {
    id: '4',
    name: 'Pikachu Illustrator',
    price: 850000,
    category: 'Pokémon TCG',
    rarity: 'Unique Promo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8-1Bk1SsSUkTOmHXrKeDMHvTniUE2PrgDnw6FCROSqyLgeo9qHRRhbu6hjCI3Twt0Vz-lL3Gz5vAQ9OJitZFWBCRa85hEXG4lekdNh7CoTnFIoleHO5B-R48NJhBYBI_x1LL8on_RK4u_1k1F4DaCh3Nt03DkKporDBu2KjKAR-Dp_yYYgUjZmaRYNG_IbdP-WYX3m3Ta4HIehOEqSbtmbyXkFHVlzbSLAp4Fk1KPuJIGHZQ5d370XxeHkVlf1CHsdwXwaqbnDzw',
    tag: 'UNIQUE PROMO'
  },
  {
    id: '5',
    name: 'Ancient Dragon Soul',
    price: 1249,
    category: 'Magic: The Gathering',
    rarity: 'Expansion 01',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlLlgWqO5OddDgAkdVWl4Q_uY2Olvk_5-f_wRb8GlW-RyRMTbxbD9dyBEvm8PO9BoORNk0nL8Ry_OLjiGqhoCQvU6FSX-yLoZ7oN6Zd3ABjIcVcH8NhNRt3hpciE_3szvb36DTz6P9J6LfvxOcme49YrjHUd4ao29foL5gUQf9AOpHDbKOawhQjDBzRbjsRfva11R5hK5T2c1Hr8TDoKg5v5codb19ys_1jLjhUBurLiPX9d5E24JagntzhsAlvZ3CTIlilyDOJeg',
    tag: 'MINT 10',
    expansion: 'EXPANSION 01'
  },
  {
    id: '6',
    name: 'Nebula Weaver',
    price: 850,
    category: 'Magic: The Gathering',
    rarity: 'Cosmos Set',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-Au2heu9iJmxwWWIay9ZpATNK5XbpDUhvvfwEsr_Qk-eNYEt62jNugqWFmZmxOxHZ1JAvypuI4DUpriINVBfjaVPXSibaWFH6oYlh64s9Vu4QpwyzjFvfXc7MegUDiuQNnGynv5YJ17_bnkrN9vbvO0AE8xUhWh7ydqxwTXzKLzmSW1sg3uqbuyO0fdoWS6m8kHMemqKjbJXkeD84QDOaCLRlrVC6Tza1nCk1Z87JehWRMqsCxMbxmG8XMbxH0qjp2-s-xR5LDo',
    tag: 'LIMITED',
    expansion: 'COSMOS SET'
  },
  {
    id: '7',
    name: 'Obsidian Sentinel',
    price: 2100,
    category: 'Magic: The Gathering',
    rarity: 'Dark Foil',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzLYQNnnKYipOQHGYpjnO6vR_SQ8qTFr6ZcUTLzJ02eHLngJp4LJDz_IYQyWBbf_wMP1RF8gVppEPNvqf1b0Np3n8_-Fd8jxOOSp4cwT_a5Qd2uQz4zsxlqyUXIiWz0tKzH6geJH6Jmal1RRIJpI-3rcXr071X5uJy1j7kw_zgn2kexKRJlk5uQKiz7_2x7S0OEMh2G9BbnMCtP0oobG_TrQiD-ZiUB7mt6elEqR6CFuLDU0NUPUC1-fRsPct6sGhGVbSqD3hmn_I',
    tag: 'RARE',
    expansion: 'DARK FOIL'
  },
  {
    id: '8',
    name: 'Obsidian Flare Dragon VMAX',
    price: 1249,
    oldPrice: 1500,
    category: 'Pokémon TCG',
    rarity: 'Secret Rare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkAi7Xu778Y38gEw77yLnucB_juf0bPuGqhzUmLCdHaE4l999nv68YjOzOgsC8zaqRm6oshU3On2cG-fIZbhDTb64GimXZ7Z44OeMiIFC_G4yFWyiA48wLoJzrI1BgQmZVBRKwxr9ie5_TCz-znz4OG8Np3o71KGeRs-gX-VTE4afMejZkS-xw7T21jLY4UOhxxTo7M4afO-90lPbyrA5LUaeRuxWLq8ZuYKX272J8si8FqFJhW-r-2hla-HCeDp7Levnt2r57I58',
    tag: 'MINT CONDITION 10.0',
    description: 'Witness the absolute pinnacle of card artistry. This Obsidian Flare variant features a triple-etched holographic surface that shifts from deep void-purple to solar-neon.'
  }
];
