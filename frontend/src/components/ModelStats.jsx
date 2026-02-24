import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';

export function AccuracyChart({ history }) {
  if (!history) return null;
  const data = history.accuracy.map((acc, i) => ({
    epoch: i + 1,
    Training: (acc * 100).toFixed(1),
    Validation: history.val_accuracy?.[i] ? (history.val_accuracy[i] * 100).toFixed(1) : null,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Training Accuracy</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
          <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Line type="monotone" dataKey="Training" stroke="#6366f1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Validation" stroke="#06b6d4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function LossChart({ history }) {
  if (!history) return null;
  const data = history.loss.map((loss, i) => ({
    epoch: i + 1,
    Training: loss.toFixed(4),
    Validation: history.val_loss?.[i]?.toFixed(4) || null,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Training Loss</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
          <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Line type="monotone" dataKey="Training" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Validation" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function ConfusionMatrixChart({ matrix }) {
  if (!matrix) return null;
  const data = [
    { name: 'True Healthy', Healthy: matrix[0][0], Parkinson: matrix[0][1] },
    { name: 'True Parkinson', Healthy: matrix[1][0], Parkinson: matrix[1][1] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Confusion Matrix</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
          <XAxis type="number" stroke="#94a3b8" fontSize={12} />
          <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={120} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }}
          />
          <Legend />
          <Bar dataKey="Healthy" fill="#22c55e" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Parkinson" fill="#ef4444" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
