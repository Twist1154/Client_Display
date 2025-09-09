// src/ai/flows/emergency-message-summarization.ts
'use server';

/**
 * @fileOverview Summarizes emergency messages for specific screens or broadcast groups.
 *
 * - summarizeEmergencyMessage - A function that summarizes lengthy emergency messages.
 * - EmergencyMessageInput - The input type for the summarizeEmergencyMessage function.
 * - EmergencyMessageOutput - The return type for the summarizeEmergencyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyMessageInputSchema = z.object({
  message: z
    .string()
    .describe('The complete, original emergency message to summarize.'),
  screenId: z.string().optional().describe('The ID of the screen.'),
  broadcastGroup: z
    .string()
    .optional()
    .describe('The broadcast group the screen belongs to.'),
});
export type EmergencyMessageInput = z.infer<typeof EmergencyMessageInputSchema>;

const EmergencyMessageOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the emergency message, tailored to the specific screen or broadcast group if relevant.'
    ),
});
export type EmergencyMessageOutput = z.infer<typeof EmergencyMessageOutputSchema>;

export async function summarizeEmergencyMessage(
  input: EmergencyMessageInput
): Promise<EmergencyMessageOutput> {
  return summarizeEmergencyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emergencyMessagePrompt',
  input: {schema: EmergencyMessageInputSchema},
  output: {schema: EmergencyMessageOutputSchema},
  prompt: `You are an expert in emergency communications.  Your role is to summarize emergency messages for display on digital signage, tailoring the message to the specific audience, screen, or broadcast group as necessary to convey critical information quickly and concisely.

Original Message: {{{message}}}

{{#if screenId}}
Screen ID: {{{screenId}}}
{{/if}}

{{#if broadcastGroup}}
Broadcast Group: {{{broadcastGroup}}}
{{/if}}

Summary:`,
});

const summarizeEmergencyMessageFlow = ai.defineFlow(
  {
    name: 'summarizeEmergencyMessageFlow',
    inputSchema: EmergencyMessageInputSchema,
    outputSchema: EmergencyMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
