use anchor_lang::prelude::*;


pub mod instructions;
pub mod state;

use crate::instructions::*;


declare_id!("9Rb6RJ25tQq8XzZg2FtdcfGWrVY79ZKdrtxn1QxwiAa");



#[program]
pub mod escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, receive_amount: u64, deposit_amount: u64) -> Result<()> {
        ctx.accounts.init_escrow_state(seed,ctx.bumps, receive_amount)?;

        ctx.accounts.deposit(deposit_amount)?;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
