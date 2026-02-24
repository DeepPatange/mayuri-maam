import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';

const tooltipStyle = {
  backgroundColor: 'rgba(15, 15, 35, 0.95)',
  border: '1px solid rgba(124, 58, 237, 0.3)',
  borderRadius: 12,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

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
      className="neon-card p-6"
    >
      <div className="relative z-10">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-5 tracking-wider uppercase">Training Accuracy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
            <XAxis dataKey="epoch" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9' }} />
            <Legend />
            <Line type="monotone" dataKey="Training" stroke="#7c3aed" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="Validation" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
      className="neon-card p-6"
    >
      <div className="relative z-10">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-5 tracking-wider uppercase">Training Loss</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
            <XAxis dataKey="epoch" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9' }} />
            <Legend />
            <Line type="monotone" dataKey="Training" stroke="#f472b6" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="Validation" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
      className="neon-card p-6"
    >
      <div className="relative z-10">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-5 tracking-wider uppercase">Confusion Matrix</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
            <XAxis type="number" stroke="#64748b" fontSize={11} />
            <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={120} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="Healthy" fill="#10b981" radius={[0, 6, 6, 0]} />
            <Bar dataKey="Parkinson" fill="#ef4444" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
