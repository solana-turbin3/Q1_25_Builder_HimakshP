use anchor_lang::{prelude::Pubkey, InitSpace};

pub mod escrow;
#[derive(InitSpace)]
pub struct Escrow{
    seed: u64,
    maker: Pubkey,
    mint_a: Pubkey,
    mint_b: Pubkey,
    bump: u8

}