import { createFileRoute } from '@tanstack/react-router';
import { Questionnaire } from '@feture/769-art';

export const Route = createFileRoute('/769/questionnaire')({
  component: Questionnaire,
});
