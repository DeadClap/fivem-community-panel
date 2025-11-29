export class CreateUserDto {
  // For now we just mock what Discord will eventually supply
  discordId: string;
  discordUsername: string;
  communityName?: string;
}
