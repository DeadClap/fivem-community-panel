declare module '../generated/prisma/client.js' {
  /**
   * Minimal PrismaClient shape used in the NestJS PrismaService.
   * The full implementation is provided by the generated client at runtime.
   */
  export class PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
  }
}
